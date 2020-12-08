import {Command} from '../model/command.js'
import { getActiveFolder, enterFolder, exitFolder, getPath } from '../state/folders.js'

const terminalOutput = document.getElementById('terminal__output');

const pwd = new Command(
    'print name of current/working directory',
    ' ',
    function pwd() {
        let echoThis = document.createElement('p')
        const pathpwd = getPath();
        echoThis.innerHTML = pathpwd;
        terminalOutput.appendChild(echoThis);
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
    function mkdir(argument) {
        argument.forEach(dir => {
            enterFolder(dir);

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
    function echo(argument) {
        let echoThis = document.createElement('p')
        let message = argument.join(' ');
        echoThis.textContent = message;
        terminalOutput.appendChild(echoThis);
    }
)

const cat = new Command(
    'cat - concatenate files and print on the standard output',
    '',
    function cat() {}
)

const rm = new Command(
    'rm - remove files or directories ',
    '',
    function rm() {}
)

const mv = new Command(
    'mv - move (rename) files ',
    '',
    function mv() {}
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
    const commandInput = document.createElement('p');
    const paramString = param.join(' ')
    const argumentString = argument.join(' ')
    commandInput.textContent = `>>> ${com} ${argumentString} ${paramString}`;
    terminalOutput.appendChild(commandInput);

    const validCom = typeof com === 'string' && com.length
    if (!validCom) return

    try {
        if (param === []) {
            return commandsList[com].run(argument)
        } else {
            return commandsList[com].run(param, argument)
        }
    } catch (error) {
        alert(error)
    }
}

const commandsList = {pwd, ls, cd, mkdir, echo, cat, rm, mv, help, man, square, clear}
export { commandsList };
