import {commandsList, runCommand} from './src/modules/data/commands.js'


console.log(runCommand('pwd', 2))

let input = document.querySelector('.terminal__input')

input.addEventListener('keydown', e => {
    if (e.keyCode === 13) {
        e.preventDefault();
        fetchInput(e.target.value)
        input.value = '';
    }
});

function fetchInput(val) {
    if (input.value !== '') {
        formatInput(val)
    }
}

fetchInput();

function formatInput(a) {
    // [command] [arguments] [path] 
    let splitted = a.split(' ');

    switch (splitted[0]) {
        case 'ls':
            /* if (splitted[1] && splitted[1][0] === '-') {
                switch (splitted[1]) {
                    case '-R':
                        console.log('list folders recursively')
                        break;
                    default:
                        console.log('ls with an argument')
                        break;
                }
            } else {
                console.log('list folders')
            }*/
            // runCommand('ls', splitted[1]);
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
            runCommand('clear')
            break;
        case 'man':
            break;
        case 'help':
            break;
        // for testing.
        case 'square':
            console.log(runCommand('square', splitted[1]))
            break;
        default:
            console.log('not a command')
            break;
    }
}
