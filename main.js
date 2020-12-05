import {runCommand} from './src/modules/data/commands.js'

// HTML Variables
let input = document.querySelector('.terminal__input')

// Event Listeners
input.addEventListener('keydown', e => {
    if (e.keyCode === 13) {
        e.preventDefault();
        fetchInput(e.target.value)
        input.value = '';
    }
});

// Grab the input
function fetchInput(val) {
    if (input.value !== '') {
        formatInput(val)
    }
}
fetchInput();

// Split the string, if the index 0 word matches a command runCommand()
function formatInput(a) {
    // [command] [arguments] [path] 
    let path = [];
    let options = [];
    let splitted = a.split(' ');
    splitted.forEach(e => {
        if (e[0] == '/') {
            path.push(e);
        }
        if (e[0] === '-') {
            options.push(e);
        }
        // console.log(path)
        // console.log(options)
    })

    switch (splitted[0]) {
        case 'ls':
            if (path = '') {
                runCommand('ls')
            } else if (path.lenght === 1) {
                runCommand('ls', path)
            } else {
                path.forEach(e => runCommand('ls', e))
            }
            break;
        case 'cd':
            break;
        case 'pwd':
            console.log(runCommand('pwd', splitted[1]));
            break;
        case 'mkdir':
            break;
        case 'echo':
            runCommand('echo', splitted[1]);
            break;
        case 'touch':
            break;
        case 'cat':
            break;
        case 'rm':
            break;
        case 'mv':
            break;
        case 'clear':
            runCommand('clear');
            break;
        case 'man':
            break;
        case 'help':
            break;
        // for testing.
        case 'square':
            runCommand('square', splitted[1]);
            break;
        default:
            return 'not a command';
    }
}
