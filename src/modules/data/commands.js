import {Command} from '../model/command.js'
import {getFolder, enterFolder, exitFolder, getAbsolutPath, getSources, removeAllSources} from '../state/folders.js'
import {appendOutput, clearOutput, setNewInput} from '../dom/terminal.js'

const pwd = new Command(
    'print name of current/working directory',
    ' ',
    (argumentList, parameterList) => {
        return getAbsolutPath();
    }
)

const ls = new Command(
    'ls - list directory contents',
    ' ',
    (argumentList, parameterList) => {
        const sources = getSources(argumentList[0]);
        sources.sort();
        return sources.join(' ');
    }
)

const cd = new Command(
    'cd - change the shell working directory.',
    ' ',
    (argumentList, parameterList) => {
        enterFolder(argumentList[0]);
    }
)

const mkdir = new Command(
    'mkdir - make directories',
    '',
    function mkdir(argumentList) {
        getFolder().addFolder(argumentList[0]) //TODO: Create folder in realative path
    }
)

const echo = new Command(
    'echo - Write arguments to the standard output.',
    '',
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
)

const cat = new Command(
    'cat - concatenate files and print on the standard output',
    '',
    (argumentList, parameterList) => {}
)

const rm = new Command(
    'rm - remove files or directories ',
    '',
    function rm(argumentList, parametersList) {
        // rm all files in the current dir
        if (argumentList.includes('*')) {
            removeAllSources(getAbsolutPath())
        }
        // rm fil* removes all files that start with fil
        argumentList.forEach(file => {
            if (file.charAt(file.length - 1) === '*') {
                let nameOfFile = file.slice(0, -1);
                for (let key in getFolder().folders) {
                    if (key.startsWith(nameOfFile)) {
                        delete getFolder().files[`${key}`]
                    }
                }
                for (let key in getFolder().files) {
                    if (key.startsWith(nameOfFile)) {
                        delete getFolder().files[`${key}`]
                    }
                }
            }
        })
        // rm fileName removes that file name
        argumentList.forEach(argument => {
            if (getFolder().hasFolder(argument)) {
                delete getFolder().folders[`${argument}`]
            } else if (getFolder().hasFile(argument)) {
                delete getFolder().files[`${argument}`]
            }
        })
    }
)

const mv = new Command(
    'mv - move (rename) files ',
    '',
    (argumentList, parameterList) => {}
)

const help = new Command(
    'help - Display information about builtin commands.',
    '',
    (argumentList, parameterList) => {}
)

const man = new Command(
    'man - an interface to the system reference manuals.',
    '',
    (argumentList, parameterList) => {}
)

const clear = new Command(
    'clear - clear the terminal screen',
    '',
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
