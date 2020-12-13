import { getInputValue, focusInput, appendOutput, setNewInput } from '../terminal/access.js';
import { addToHistory } from '../store/history.js';
import { decodeInstruction } from '../util/decode.js';
import { getCommandList } from '../store/theme.js'

document.addEventListener('keydown', e => {
    if (e.key === "Enter") {
        e.preventDefault();
        process(getInputValue());
    }
});

document.addEventListener('click', () => {
    focusInput();
})

function process(rawInput) {
    addToHistory(rawInput);
    const decoded = decodeInstruction(rawInput)
    try {
        runCommand(decoded.command, decoded.argumentList, decoded.parameters);
    } catch(error) {
        alert(error)
    }
}

function runCommand(com, argumentList = [], parametersList = []) {
    const output = getCommandList()[com].run(argumentList, parametersList);
    appendOutput(output);
    setNewInput();
}