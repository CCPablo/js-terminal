import { manCat, manClear, manEcho, manHelp, manMan, manMkdir, manTouch } from '../../manual/manFileReferenceCaller.js';
import { appendFileContent, createFolder, getFileContent, setFileContent } from "../../store/root.js";
import { setTerminal } from "../../store/theme.js";
import { clearOutput } from "../../terminal/access.js";
import { decodeMark } from "../../util/decode.js";
import { Command } from "../model/command.js";


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
            console.log(decoded);
            if(decoded) {
                const originText = decoded.source.reduce((acc, path) => acc + getFileContent(path, asteriskCondition).join(' '), '');
                decoded.target.map(path => {
                    if(decoded.mark === '>') {
                        return setFileContent(path, originText, asteriskCondition);
                    } else if(decoded.mark === '>>') {
                        return appendFileContent(path, originText, asteriskCondition);
                    }
                });
            } else {
                return argumentList.map(path => getFileContent(path, asteriskCondition).join('<br>')).join('<br>');
            }
        }
    ),
    touch: new Command(
        'touch -- change file access and modification times',
        manTouch.All,
        (argumentList, parameterList) => {
            argumentList.forEach(file => {
                return createFile(file)
            });
        }
    ),
    echo: new Command(
        'echo - Write arguments to the standard output.',
        '',
        manEcho.All,
        (argumentList, parameterList) => {
            if (argumentList[argumentList.indexOf('>')]) {
                let indexOfBiggerThan = argumentList.indexOf('>')
                let stringToEcho = argumentList.slice(0, indexOfBiggerThan)
                argumentList.splice(indexOfBiggerThan, 1);
                let nameOfFiles = argumentList.slice(indexOfBiggerThan, argumentList.length)
                stringToEcho = stringToEcho.join(' ');
                nameOfFiles.forEach(name => {
                    getFolder().addFile(name, stringToEcho)
                })
            } else {
                return argumentList.join(' ');
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
            if (argumentList.length === 0) {
                for (let command in commandsList) {
                    const descriptions = commandsList[command].manRef;
                    appendOutput(descriptions);
                }
            } else {
                return commandsList[argumentList].manRef;
            }
        }
    ),
    help: new Command(
        'help - Display information about builtin commands.',
        manHelp.All,
        (argumentList, parameterList) => {
            if (argumentList.length === 0) {
                let cl = "";
                for (let command in commandsList) {
                    const cl = commandsList[command].description;
                    appendOutput(cl);
                }
            } else {
                return commandsList[argumentList[0]].description;

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

const asteriskCondition = (name, _, child) => {
    const manyCondition = 
        child.includes("*")
        && name.startsWith(child.slice(0, child.indexOf("*"))) 
        && name.endsWith(child.slice(child.indexOf("*") + 1));

    return child === name || manyCondition;
}