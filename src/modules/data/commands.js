import {Command} from '../model/command.js'


const pwd = new Command(
    'print name of current/working directory',
    ' ',
    function pwd(a) {
        return a * 2;
    }
)

const ls = new Command(
    'ls - list directory contents',
    ' ',
    function ls() {}
)

const cd = new Command(
    'cd - change the shell working directory.',
    ' ',
    function cd(a = []) {
        if (a === '..') {
        }
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
    function echo() {}
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

const commandsList = {pwd, ls, cd, mkdir, echo, cat, rm, mv, help}
export {commandsList};
