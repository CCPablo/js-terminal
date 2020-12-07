import {runCommand} from './data/commands.js'

// HTML Variables
let input = document.querySelector('.terminal__input')

// Event Listeners
input.addEventListener('keydown', e => {
    if (e.keyCode === 13) {
        e.preventDefault();
        process(e.target.value);
        input.value = '';
    }
});


// Split the string, if the index 0 word matches a command runCommand()
function decode(rawInput) {

    // [command] [parameters] [argumentLists]  
    const decoded = {command: '', parameters: [], argumentList: []}

    let splitted = rawInput.split(' ');

    decoded.command = splitted[0]
    splitted.shift();

    splitted.forEach(e => {
        if (e[0] === '-') {
            decoded.parameters.push(e);
        } else {
            decoded.argumentList.push(e);
        }
    })

    return decoded;
}

function process(rawInput) {
    const decoded = decode(rawInput)
    runCommand(decoded.command, decoded.argumentList, decoded.parameters);
}
