import { autocomplete } from './state/root.js';
import { decode } from './filter-input.js'
import { appendToInput, getCaretPosition, getInputValue } from './dom/terminal.js';

const lastWordRegex = /\S+$/;

document.addEventListener('keydown', (event) => {
    if (event.key === "Tab") {
        event.preventDefault();
        const decoded = decode(getInputValue());
        if(caretUnderCommand(decoded.command.length)) {
            return;
        }
        appendToInput(autocomplete(getWordUnderCursor()))
    }

    function caretUnderCommand(commandLength) {
        return (getCaretPosition() <= commandLength);
    }

    function getWordUnderCursor() {
        let caretPosition = getInputValue().indexOf(' ', getCaretPosition());
        if (caretPosition == -1) {
            caretPosition = getInputValue().length;
        }
        const word = lastWordRegex.exec(getInputValue().slice(0, caretPosition));
        if(word === null) {
            return '';
        } else {
            return word[0];
        }
    }
});