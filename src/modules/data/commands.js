import {Command} from '../model/command.js'
import {getFolder, enterFolder, exitFolder, getAbsolutPath, getSources } from '../state/folders.js'
import { appendOutput, clearOutput, setNewInput } from '../dom/terminal.js'
import {manCat, manCd, manClear, manEcho, manLs, manMkdir, manMv, manPwd, manRm, manHelp, manMan} from './manFiles/manFileReferenceCaller.js';


let test = document.getElementsByClassName('terminal__output');

const pwd = new Command(
    'print name of current/working directory',
    test.innerHTML = manPwd.All,
    (argumentList, parameterList) => {
        return getAbsolutPath();
    }
)

const ls = new Command(
    'ls - list directory contents',
    test.innerHTML = manLs.All,
    (argumentList, parameterList) =>  {
        const sources = getSources(argumentList[0]);
        sources.sort();
        return sources.join(' ');
    }
)

const cd = new Command(
    'cd - change the shell working directory.',
    test.innerHTML = manCd.All,
    (argumentList, parameterList) =>  {
        enterFolder(argumentList[0]);
    }
)

const mkdir = new Command(
    'mkdir - make directories',
    test.innerHTML = manMkdir.All,
    function mkdir(argumentList) {
        getFolder().addFolder(argumentList[0]) //TODO: Create folder in realative path
    }
)

const echo = new Command(
    'echo - Write arguments to the standard output.',
    test.innerHTML = manEcho.All,
    (argumentList, parameterList) =>  {
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
)

const cat = new Command(
    'cat - concatenate files and print on the standard output',
    test.innerHTML = manCat.All,
    (argumentList, parameterList) => {}
)

const rm = new Command(
    'rm - remove files or directories ',
    test.innerHTML = manRm.All,
    (argumentList, parameterList) => {}
)

const mv = new Command(
    'mv - move (rename) files ',
    test.innerHTML = manMv.All,
    (argumentList, parameterList) => {}
)

const help = new Command(
    'help - Display information about builtin commands.',
    test.innerHTML = manHelp.All,
    (argumentList, parameterList) => {
        if (argumentList.length === 0) {
            for ( let command in commandsList) {
                const descriptions = commandsList[command].description
                appendOutput(descriptions);
            }
        } else {
            const descriptions = commandsList[argumentList].description;
            appendOutput(descriptions);
        }
    }
)


const man = new Command(
    'man - an interface to the system reference manuals.',
    test.innerHTML = manMan.All,
    (argumentList, parameterList) => {
        if (argumentList.length === 0) {
            for ( let command in commandsList) {
                const descriptions = commandsList[command].manRef
                appendOutput(descriptions);
            }
        } else {
            const descriptions = commandsList[argumentList].manRef;
            appendOutput(descriptions);
        }
    }
)


const clear = new Command(
    'clear - clear the terminal screen',
    test.innerHTML = manClear.All,
    (argumentList, parameterList) => {
        clearOutput();
    }
)

const square = new Command(
    'square - return square of value for testing',
    '',
    (argumentList, parameterList) => {
        return '**';
    }
)

export function runCommand(com, argumentList = [], parametersList = []) {
    const output = commandsList[com].run(argumentList, parametersList);
    appendOutput(output);
    setNewInput();
}

const commandsList = {pwd, ls, cd, mkdir, echo, cat, rm, mv, help, man, square, clear}


