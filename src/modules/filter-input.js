import {runCommand} from './data/commands.js'

// Event Listeners
document.addEventListener('keydown', e => {
    if (e.key === "Enter") {
        e.preventDefault();
        const input = document.querySelector('.terminal__input.active')
        process(input.innerHTML);
        input.innerHTML = '';
    }
});

document.addEventListener('click', e => {
    const input = document.querySelector('.terminal__input.active');
    input.focus();
})


// Split the string, if the index 0 word matches a command runCommand()
function decode(rawInput) {
    // [command] [parameters] [argumentLists]
    const decoded = {command: '', parameters: [], argumentList: []}

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
    try {
        runCommand(decoded.command, decoded.argumentList, decoded.parameters);
    } catch(error) {
        alert(error)
    }
}
