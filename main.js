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
    let splited = a.split(' ');
    switch (splited[0]) {
        case 'ls':
            console.log('list folders')
            break;
        case 'cd':
            break;
        case 'pwd':
            break;
        case 'mkdir':
            break;
        case 'echo':
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
            break;
    }
}
