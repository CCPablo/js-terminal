import {Command} from '../model/command.js'
import {Folder} from '../model/folder.js'
import {File} from '../model/file.js'
import {getActiveFolder, enterFolder, exitFolder, getPath, rootFolder} from '../state/folders.js'

const terminalOutput = document.getElementById('terminal__output');

const pwd = new Command(
    'print name of current/working directory',
    ' ',
    function pwd(a) {

    }
)

const ls = new Command(
    'ls - list directory contents',
    ' ',
    function ls(argumentList, parameters) {
        if (argumentList.length > 0) {
            enterFolder(argumentList);
            let listOfFilesAndFolders = getActiveFolder().getFileNames()
            listOfFilesAndFolders.concat(getActiveFolder().getFolderNames())
            listOfFilesAndFolders.sort();
            let echoThis = document.createElement('p');
            let message = listOfFilesAndFolders.join(' ');
            echoThis.textContent = message;
            terminalOutput.appendChild(echoThis);
            exitFolder();
        } else {
            let listOfFilesAndFolders = getActiveFolder().getFileNames()
            listOfFilesAndFolders.concat(getActiveFolder().getFolderNames())
            listOfFilesAndFolders.sort();
            let echoThis = document.createElement('p');
            let message = listOfFilesAndFolders.join(' ');
            echoThis.textContent = message;
            terminalOutput.appendChild(echoThis);
        }
    }
)

const cd = new Command(
    'cd - change the shell working directory.',
    ' ',
    function cd(/*a = []*/) {
        //   if (a === '..') {
        //   }
    }
)

const mkdir = new Command(
    'mkdir - make directories',
    '',
    function mkdir(argumentList) {
    }
)

const echo = new Command(
    'echo - Write arguments to the standard output.',
    '',
    function echo(argumentList, parameter) {
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
    function echo() {}
)

const rm = new Command(
    'rm - remove files or directories ',
    '',
    function rm() {}
)

const mv = new Command(
    'mv - move (rename) files ',
    '',
    function rm() {}
)

const help = new Command(
    'help - Display information about builtin commands.',
    '',
    function help() {}
)

const man = new Command(
    'man - an interface to the system reference manuals.',
    '',
    function man() {}
)

const clear = new Command(
    'clear - clear the terminal screen',
    '',
    function clear() {
        terminalOutput.innerHTML = '';
    }
)

const square = new Command(
    'square - return square of value for testing',
    '',
    function square(a) {
        let result = document.createElement('p');
        result.textContent = a * a;
        terminalOutput.appendChild(result);
    }
)

export function runCommand(com, argumentList, params = []) {
    try {
        if (params === []) {
            return commandsList[com].run(argumentList)
        } else {
            return commandsList[com].run(argumentList, params)
        }
    } catch (error) {
        alert(error)
    }
}

const commandsList = {pwd, ls, cd, mkdir, echo, cat, rm, mv, help, man, square, clear}
