import {Command} from '../model/command.js'
import { changePath, createFolder, removeFile, removeFolder, getPath, getSourceNames } from '../state/root.js'
import { appendOutput, clearOutput, setNewInput } from '../dom/terminal.js'
import {manCat, manCd, manClear, manEcho, manLs, manMkdir, manMv, manPwd, manRm, manHelp, manMan} from './manFiles/manFileReferenceCaller.js';


const pwd = new Command(
    'print name of current/working directory',
    manPwd.All,
    (argumentList, parameterList) => {
        return getPath();
    }
)

const ls = new Command(
    'ls - list directory contents',
    manLs.All,
    (argumentList, parameterList) =>  {
        const sources = getSourceNames(argumentList[0]);
        return sources.join(' ');
    }
)

const cd = new Command(
    'cd - change the shell working directory.',
    manCd.All,
    (argumentList, parameterList) =>  {
        changePath(argumentList[0]);
    }
)

const mkdir = new Command(
    'mkdir - make directories',
    manMkdir.All,
    function mkdir(argumentList) {
        argumentList.forEach(path => createFolder(path));
    }
)

const echo = new Command(
    'echo - Write arguments to the standard output.',
    manEcho.All,
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
    manCat.All,
    (argumentList, parameterList) => {}
)

const rm = new Command(
    'rm - remove files or directories ',
    manRm.All,
    (argumentList, parameterList) => {
        if(parameterList.includes("-r")) {
            argumentList.forEach(path => removeFolder(path));
        } else {
            argumentList.forEach(path => removeFile(path));
        }
    }
)

const mv = new Command(
    'mv - move (rename) files ',
    manMv.All,
    (argumentList, parameterList) => {}
)

const help = new Command(
    'help - Display information about builtin commands.',
    manHelp.All,
    (argumentList, parameterList) => {
        if (argumentList.length === 0) {
            let cl = "";
            for ( let command in commandsList) {
                const cl = commandsList[command].description;
                appendOutput(cl);
                }
        } else {
            return commandsList[argumentList[0]].description;

        }
    }
)

/// Generate to return all commands man and help
const man = new Command(
    'man - an interface to the system reference manuals.',
    manMan.All,
    (argumentList, parameterList) => {
        if (argumentList.length === 0) {
            for ( let command in commandsList) {
                const descriptions = commandsList[command].manRef;
                appendOutput(descriptions);
            }
        } else {
            return commandsList[argumentList].manRef;
        }
    }
)


const clear = new Command(
    'clear - clear the terminal screen',
    manClear.All,
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

const terminal = new Command(
    'terminal - changes the terminal Mode',
    '',
    (argumentList, parameterList) => {
        let setTheme  = function (themeName) {
            document.documentElement.className = themeName ;
            appendOutput(`The commmand console changed to ${argumentList}`);
            }
        setTheme(argumentList)
    });


export function runCommand(com, argumentList = [], parametersList = []) {
    const output = commandsList[com].run(argumentList, parametersList);
    appendOutput(output);
    setNewInput();
}

const commandsList = {pwd, ls, cd, mkdir, echo, cat, rm, mv, help, man, square, clear, terminal}


