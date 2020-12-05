import {Command} from '../model/command.js'

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
    function echo(a) {
        let echoThis = document.createElement('p')
        echoThis.textContent = a;
        terminalOutput.appendChild(echoThis);
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
export function runCommand(com, a = []) {
    return commandsList[com].run(a)
}

const commandsList = {pwd, ls, cd, mkdir, echo, cat, rm, mv, help, man, square, clear}
export {commandsList};
