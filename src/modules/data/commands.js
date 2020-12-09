import {Command} from '../model/command.js'
import {getActiveFolder, enterFolder, exitFolder, getPath, getSources } from '../state/folders.js'
import { setOutput, clearOutput } from '../dom/terminal.js'

const pwd = new Command(
    'print name of current/working directory',
    ' ',
    (argumentList, parameterList) => {
        setOutput(getPath())
    }
)

const ls = new Command(
    'ls - list directory contents',
    ' ',
    (argumentList, parameterList) =>  {
        const sources = getSources();   //TODO: Coger las fuentes de la carpeta correspondiente
        sources.sort();
        let message = sources.join(' ');
        if (argumentList.length > 0) {
            enterFolder(argumentList);
            setOutput(message);
            exitFolder();
        } else {
            setOutput(message);
        }
    }
)

const cd = new Command(
    'cd - change the shell working directory.',
    ' ',
    (argumentList, parameterList) =>  {
        if (argumentList.length === 1 && argumentList[0] == '..') {
            exitFolder();
        } else if (argumentList.length <= 0) {
            // enterFolder(rootFolder.getPath())
        } else {
            let listOfFolders = getActiveFolder().getFolderNames()
            if (listOfFolders.includes(argumentList.join(' '))) {
                enterFolder(argumentList.join(' '))
            } else {
                setOutput(`cd: no such file or directory: ${argumentList.join(' ')}`)
            }
        }
    }
)

const mkdir = new Command(
    'mkdir - make directories',
    '',
    function mkdir(argumentList) {
        getActiveFolder().addFolder(argumentList.join())
    }
)

const echo = new Command(
    'echo - Write arguments to the standard output.',
    '',
    (argumentList, parameterList) =>  {
        if (argumentList[argumentList.indexOf('>')]) {
            let indexOfBiggerThan = argumentList.indexOf('>')
            let stringToEcho = argumentList.slice(0, indexOfBiggerThan)
            argumentList.splice(indexOfBiggerThan, 1);
            let nameOfFiles = argumentList.slice(indexOfBiggerThan, argumentList.length)
            stringToEcho = stringToEcho.join(' ');
            nameOfFiles.forEach(name => {
                getActiveFolder().addFile(name, stringToEcho)
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
    (argumentList, parameterList) => {}
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
    try {
        commandsList[com].run(argumentList, parametersList)
    } catch (error) {
        alert(error)
    }
}

const commandsList = {pwd, ls, cd, mkdir, echo, cat, rm, mv, help, man, square, clear}
