import { getInputValue, focusInput, appendOutput, setNewInput } from '../terminal/access.js';
import { addToHistory } from '../store/history.js';
import { decodeInstruction } from '../util/decode.js';
import { getCommand, getCommandList } from '../store/theme.js'
import { commandList } from '../commands/commands.js';
import { COMMAND_NOT_FOUND_FAIL, Fail } from '../fail/fail.js';

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
    runCommand(decoded.command, decoded.argumentList, decoded.parameters);
}

function runCommand(com, argumentList = [], parametersList = []) {
    if(getCommandList().hasOwnProperty(com)) {
        const output = getCommand(com).run(argumentList, parametersList);
        appendOutput(output);
        setNewInput();
    } else {
        appendOutput(COMMAND_NOT_FOUND_FAIL(com).getFailMessage());
        setNewInput();
    }

}