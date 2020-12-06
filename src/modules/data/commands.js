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
    function ls(a) {
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
    function mkdir() {}
)

const echo = new Command(
    'echo - Write arguments to the standard output.',
    '',
    function echo(argument, parameter = []) {
        if (parameter.length > 0) {
            argument.forEach(e => {
                if (e === '>') {
                    let indexOfBiggerThan = argument.indexOf(e);
                    let stringToEcho = argument.slice(0, indexOfBiggerThan);
                    let nameOfFile = argument[argument.length - 1];
                    stringToEcho.join(' ');
                    argument.splice(indexOfBiggerThan, 1);
                    rootFolder.addFile(nameOfFile, stringToEcho)
                }
            })
        } else {
            let echoThis = document.createElement('p')
            let message = argument.join(' ');
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

export function runCommand(com, argument, param = []) {
    try {
        if (param === []) {
            return commandsList[com].run(argument)
        } else {
            return commandsList[com].run(argument, param)
        }
    } catch (error) {
        alert(error)
    }
}

const commandsList = {pwd, ls, cd, mkdir, echo, cat, rm, mv, help, man, square, clear}
