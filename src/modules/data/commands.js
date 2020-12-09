import {Command} from '../model/command.js'
import {getFolder, enterFolder, exitFolder, getAbsolutPath, getSources} from '../state/folders.js'
import {setOutput, clearOutput} from '../dom/terminal.js'

const pwd = new Command(
    'print name of current/working directory',
    ' ',
    (argumentList, parameterList) => {
        setOutput(getAbsolutPath())
    }
)

const ls = new Command(
    'ls - list directory contents',
    ' ',
    (argumentList, parameterList) => {
        const sources = getSources(argumentList[0]);
        sources.sort();
        let message = sources.join(' ');
        setOutput(message);
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
            setOutput(argumentList.join(' '));
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
        let formatedArgument = argumentList.join(' ')
        // rm all files in the current dir
        if (argumentList.includes('*')) {
            getFolder().folders = {}; getFolder().files = {}
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
        if (getFolder().hasFolder(formatedArgument)) {
            delete getFolder().folders[`${formatedArgument}`]
        } else if (getFolder().hasFile(formatedArgument)) {
            delete getFolder().files[`${formatedArgument}`]
        }
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
        setOutput('**')
    }
)

export function runCommand(com, argumentList = [], parametersList = []) {
    commandsList[com].run(argumentList, parametersList)
}

const commandsList = {pwd, ls, cd, mkdir, echo, cat, rm, mv, help, man, square, clear}
