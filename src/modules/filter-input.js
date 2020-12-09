import { runCommand } from './data/commands.js'

// HTML Variables
let input = document.querySelector('.terminal__input')
export let validCom = '';

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
    const decoded = { command: '', parameters: [], argumentList: [] }

    let splitted = rawInput.split(' ');

    decoded.command = splitted.shift();

    splitted.forEach(element => {
        if (element.startsWith('-')) {
            decoded.parameters.push(element);
        } else {
            decoded.argumentList.push(element);
        }
    })

    return decoded;
}

function process(rawInput) {
    const decoded = decode(rawInput)
    validCom = rawInput;
    runCommand(decoded.command, decoded.argumentList, decoded.parameters);
}
