import {runCommand} from './data/commands.js'
import { getInputValue, focusInput } from './dom/terminal.js';
import { addToHistory } from './state/history.js';
import { splitWhiteSpaces } from './util/string.js';

document.addEventListener('keydown', e => {
    if (e.key === "Enter") {
        e.preventDefault();
        process(getInputValue());
    }
});

document.addEventListener('click', () => {
    focusInput();
})

function decode(rawInput) {
    const decoded = {command: '', parameters: [], argumentList: []}

    let splitted = splitWhiteSpaces(rawInput);

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
    addToHistory(rawInput);
    const decoded = decode(rawInput)
    try {
        runCommand(decoded.command, decoded.argumentList, decoded.parameters);
    } catch(error) {
        alert(error)
    }
}

export { decode };