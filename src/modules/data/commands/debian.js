import {Command} from '../model/command.js'
import { changePath, createFolder, getFileContent, setFileContent, appendFileContent, getPath, getSources, removeSources } from '../../state/store/root.js'
import { appendOutput, clearOutput } from '../../terminal/access.js'
import {manCat, manCd, manClear, manEcho, manLs, manMkdir, manMv, manPwd, manRm, manHelp, manMan} from '../manual/manFileReferenceCaller.js';
import { decodeMark } from '../../util/decode.js'
import { getCommand, getCommandList } from '../../state/store/theme.js';

export const debianCommands = {
    pwd: new Command(
        'print name of current/working directory',
        manPwd.All,
        () => {
            return getPath();
        }
    ),
    ls: new Command(
        'ls - list directory contents',
        manLs.All,
        (argumentList, parameterLisat) =>  {
            const sources = getSources(argumentList[0]);
            return sources.map(source => source.name).join(' ');
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
    cat: new Command(
        'cat - concatenate files and print on the standard output',
        manCat.All,
        (argumentList, parameterList) => {
            const decodedMark = decodeMark(argumentList);
            if(decodedMark) {
                const originText = decodedMark.before.reduce((acc, path) => acc + getFileContent(path), '');
                if(decodedMark.mark === '>') {
                    decodedMark.after.forEach(path => setFileContent(path, originText));
                } else if(decodedMark.mark === '>>') {
                    decodedMark.after.forEach(path => appendFileContent(path, originText));
                }
            } else {
                return argumentList.reduce((acc, path) => acc + getFileContent(path), '');
            }
        }
    ),
    rm: new Command(
        'rm - remove files or directories ',
        manRm.All,
        (argumentList, parameterList) => {
            argumentList.forEach(path => removeSources(path, parameterList.includes("-r")));
        }
    ),
    mv: new Command(
        'mv - move (rename) files ',
        manMv.All,
        (argumentList, parameterList) => {}
    ),
    help: new Command(
        'help - Display information about builtin commands.',
        manHelp.All,
        (argumentList, parameterList) => {
            return argumentList.length === 0 ?
            Object.values(getCommandList()).map(command => command.description).join('<br>') :
            argumentList.map(command => getCommand(command).description).join('<br>')
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
    clear: new Command(
        'clear - clear the terminal screen',
        manClear.All,
        (argumentList, parameterList) => {
            clearOutput();
        }
    ),
    square: new Command(
        'square - return square of value for testing',
        '',
        (argumentList, parameterList) => {
            return '**';
        }
    )
}