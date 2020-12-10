import {Command} from '../model/command.js'
import { Folder } from '../model/folder.js'
import {getFolder, enterFolder, exitFolder, getAbsolutPath, getSources } from '../state/folders.js'
import {manCat, manCd, manClear, manEcho, manLs, manMkdir, manMv, manPwd, manRm} from './manFiles/manFileReferenceCaller.js';

import { setOutput, clearOutput } from '../dom/terminal.js'

let test = document.getElementById('terminal__output');

const pwd = new Command(
    'print name of current/working directory',
    test.innerHTML = manPwd.All,
    (argumentList, parameterList) => {
        setOutput(getAbsolutPath())
    }
)

const ls = new Command(
    'ls - list directory contents',
    test.innerHTML = manLs.All,
    (argumentList, parameterList) =>  {
        const sources = getSources(argumentList[0]);
        sources.sort();
        let message = sources.join(' ');
        setOutput(message);
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
        getFolder().addFolder(argumentList[0])
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
            setOutput(argumentList.join(' '));
        }
    }
)

const cat = new Command(
    'cat - concatenate files and print on the standard output',
    test.innerHTML = manCat.All,
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
    'manhelp.All',
    (argumentList, parameterList) => {
        if (argumentList.length === 0) {
            for ( let command in commandsList) {
                const descriptions = commandsList[command].description
                setOutput(descriptions);
            }
        } else {
            const descriptions = commandsList[argumentList].description;
            setOutput(descriptions);
        }
    }
)

const man = new Command(
    'man - an interface to the system reference manuals.',
    test.innerHTML = manLs.All,
    (argumentList, parameterList) => {
        if (argumentList.length === 0) {
            for ( let command in commandsList) {
                const descriptions = commandsList[command].manRef
                setOutput(descriptions);
            }
        } else {
            const descriptions = commandsList[argumentList].manRef;
            setOutput(descriptions);
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
    'manSquare.All',
    (argumentList, parameterList) => {
        setOutput('**')
    }
)

export function runCommand(com, argumentList = [], parametersList = []) {
    commandsList[com].run(argumentList, parametersList)
}

const commandsList = {pwd, ls, cd, mkdir, echo, cat, rm, mv, help, man, square, clear}

