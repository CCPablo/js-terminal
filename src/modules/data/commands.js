import {Command} from '../model/command.js'
import {getActiveFolder, enterFolder, exitFolder, getPath, rootFolder} from '../state/folders.js'

const terminalOutput = document.getElementById('terminal__output');

const pwd = new Command(
    'print name of current/working directory',
    ' ',
    (argumentList, parameterList) => {
        let echoThis = document.createElement('p')
        const pathpwd = getPath();
        echoThis.innerHTML = pathpwd;
        terminalOutput.appendChild(echoThis);
    }
)

const ls = new Command(
    'ls - list directory contents',
    ' ',
    (argumentList, parameterList) =>  {
        let listOfFiles = getActiveFolder().getFileNames()
        let listOfFolders = getActiveFolder().getFolderNames()
        let listOfFilesAndFolders = listOfFiles.concat(listOfFolders)
        listOfFilesAndFolders.sort();
        let echoThis = document.createElement('p');
        let message = listOfFilesAndFolders.join(' ');
        if (argumentList.length > 0) {
            enterFolder(argumentList);
            echoThis.textContent = message;
            terminalOutput.appendChild(echoThis);
            exitFolder();
        } else {
            echoThis.textContent = message;
            terminalOutput.appendChild(echoThis);
        }
    }
)

const cd = new Command(
    'cd - change the shell working directory.',
    ' ',
    (argumentList, parameterList) =>  {
        if (argumentList.length === 1 && argumentList[0] == '..') {
            exitFolder();
            console.log(getActiveFolder())
        } else if (argumentList.length <= 0) {
            // enterFolder(rootFolder.getPath())
        } else {
            let listOfFolders = getActiveFolder().getFolderNames()
            if (listOfFolders.includes(argumentList.join(' '))) {
                enterFolder(argumentList.join(' '))
            } else {
                let echoThis = document.createElement('p');
                echoThis.textContent = `cd: no such file or directory: ${argumentList.join(' ')}`
                terminalOutput.appendChild(echoThis);
            }
        }
    }
)

const mkdir = new Command(
    'mkdir - make directories',
    '',
    (argumentList, parameterList) =>  {
        argumentList.forEach(dir => {
            getActiveFolder().addFolder(dir)
            let mkdirThis = document.createElement('p');
            let pathmkdir = getPath();
            mkdirThis.innerHTML = pathmkdir;
            terminalOutput.appendChild(mkdirThis);
            exitFolder();
        });
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
            let echoThis = document.createElement('p');
            let message = argumentList.join(' ');
            echoThis.textContent = message;
            terminalOutput.appendChild(echoThis);
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
        terminalOutput.innerHTML = '';
    }
)

const square = new Command(
    'square - return square of value for testing',
    '',
    (argumentList, parameterList) => {
        let result = document.createElement('p');
        result.textContent = a * a;
        terminalOutput.appendChild(result);
    }
)

export function runCommand(com, argumentList, parametersList = []) {
    try {
        if (parametersList === []) {
            return commandsList[com].run(argumentList)
        } else {
            return commandsList[com].run(parametersList, argumentList)
        }
    } catch (error) {
        alert(error)
    }
}

const commandsList = {pwd, ls, cd, mkdir, echo, cat, rm, mv, help, man, square, clear}
