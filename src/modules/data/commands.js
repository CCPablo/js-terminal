import {Command} from '../model/command.js'
import { Folder } from '../model/folder.js'
import {getFolder, enterFolder, exitFolder, getAbsolutPath, getSources } from '../state/folders.js'
import { setOutput, clearOutput } from '../dom/terminal.js'

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
    (argumentList, parameterList) =>  {
        const sources = getSources(argumentList[0]);
        sources.sort();
        let message = sources.join(' ');
        setOutput(message);
    }
)

const cd = new Command(
    'cd - change the shell working directory.',
    ' ',
    (argumentList, parameterList) =>  {
        enterFolder(argumentList[0]);
    }
)

const mkdir = new Command(
    'mkdir - make directories',
    '',
    function mkdir(argumentList) {
        getFolder().addFolder(argumentList[0])
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
    (argumentList, parameterList) => {
    const fileShow = argumentList.join(' ');
    const allFiles = getFolder().files;
        for(let fileName in allFiles) {
            if (fileName === fileShow) {
                const contentCat = allFiles[fileName].content;
                setOutput(contentCat);
            }
        }
    }
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
    commandsList[com].run(argumentList, parametersList)
}

const commandsList = {pwd, ls, cd, mkdir, echo, cat, rm, mv, help, man, square, clear}
