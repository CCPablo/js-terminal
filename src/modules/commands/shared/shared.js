import { manCat, manClear, manEcho, manHelp, manMan, manMkdir, manTouch } from '../../manual/manFileReferenceCaller.js';
import { appendFileContent, createFolder, getFileContent, setFileContent } from "../../store/root.js";

import { setNewInput, clearOutput, getInputValue } from "../../terminal/access.js";

import { getCommandList, setTerminal, getCommand} from "../../store/theme.js";

import { decodeMark } from "../../util/decode.js";
import { Command } from "../model/command.js";
import { asteriskCondition } from '../util/condition.js'

export const sharedCommands = {
    mkdir: new Command(
        'mkdir - make directories',
        manMkdir.All,
        function mkdir(argumentList) {
            argumentList.forEach(path => createFolder(path));
        }
    ),
    cat: new Command(
        'cat - concatenate files and print on the standard output',
        manCat.All,
        (argumentList, parameterList) => {
            const decoded = decodeMark(argumentList);
            if(decoded) {
                if (decoded.source.length === 0) {
                    document.addEventListener('keydown', e => {
                        if (e.ctrlKey && e.key === "d") {
                            e.preventDefault();
                            const originText = getInputValue();
                            console.log(originText);
                            decoded.target.map(path => {
                                if(decoded.mark === '>') {
                                    return setFileContent(path, originText, asteriskCondition);
                                } else if(decoded.mark === '>>') {
                                    return appendFileContent(path, originText, asteriskCondition);
                                }
                            });
                            setNewInput();
                        }
                    });

                }
                const originText = decoded.source.reduce((acc, path) => acc + getFileContent(path, asteriskCondition).join(' '), '');

            } else {
                console.log(argumentList);
                return argumentList.map(path => getFileContent(path, asteriskCondition).join('<br>')).join('<br>');
            }
        }
    ),
    echo: new Command(
        'cat - concatenate files and print on the standard output',
        manEcho.All,
        (argumentList, parameterList) => {
            const decoded = decodeMark(argumentList);
            if(decoded) {
                if (decoded.source.length === 0) {
                    document.addEventListener('keydown', e => {
                        if (e.ctrlKey && e.key === "d") {
                            e.preventDefault();
                            const originText = getInputValue();
                            decoded.target.map(path => {
                                if(decoded.mark === '>') {
                                    return setFileContent(path, originText, asteriskCondition);
                                } else if(decoded.mark === '>>') {
                                    return appendFileContent(path, originText, asteriskCondition);
                                }
                            });
                            setNewInput();
                        }
                    });

                }
                const originText = decoded.source.reduce((acc, path) => acc + getFileContent(path, asteriskCondition).join(' '), '');

            } else {
                return argumentList.map(path => path.join(' ')).join('<br>');
            }
        }
    ),
    clear: new Command(
        'clear - clear the terminal screen',
        manClear.All,
        (argumentList, parameterList) => {
            clearOutput();
        }
    ),
    man: new Command(
        'man - an interface to the system reference manuals.',
        manMan.All,
        (argumentList, parameterList) => {
            let commandsList = Object.values(getCommandList());
            if (argumentList.length === 0) {
                return commandsList.map( command => command.manRef).join("<br>");

            } else {
                return getCommand(argumentList).manRef;
            }
        }
    ),
    help: new Command(
        'help - Display information about builtin commands.',
        manHelp.All,
        (argumentList, parameterList) => {
            let commandsList = Object.values(getCommandList());
            if (argumentList.length === 0) {
                return commandsList.map( command => command.description).join("<br>");
            } else {
                return getCommand(argumentList).description
            }
        }
    ),
    windows: new Command(
        'windows - changes terminal to windows mode',
        '',
        () => {
            setTerminal('windows')
            clearOutput();
        }
    ),
    mac: new Command(
        'mac - changes terminal to mac mode',
        '',
        () => {
            setTerminal('mac')
            clearOutput();
        }
    ),
    debian: new Command(
        'debian - changes terminal to debian mode',
        '',
        () => {
            setTerminal('debian')
            clearOutput();
        }
    )
}