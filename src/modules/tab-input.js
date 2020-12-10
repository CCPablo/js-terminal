import { autocomplete } from './state/folders.js';
import { decode } from './filter-input.js'
import { appendToInput, getCaretPosition, getInputValue } from './dom/terminal.js';

const parentPathRegex = /\S+\//;
const lastWordRegex = /\S+$/;

document.addEventListener('keydown', (event) => {
    if (event.key === "Tab") {
        event.preventDefault();
        const decoded = decode(getInputValue());
        if(caretUnderCommand(decoded.command.length)) {
            return;
        }
        const pathToAutocomplete = getWordUnderCursor();
        const parentPath = getParentPath(pathToAutocomplete);
        const lettersToAutocomplete = pathToAutocomplete.replace(parentPath, "");
        appendToInput(autocomplete(parentPath, lettersToAutocomplete))
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

    function getParentPath(relativePath) {
        if(relativePath.includes('/')) {
            if(relativePath.startsWith('/')) {
                const parentPath = parentPathRegex.exec(relativePath);
                if(parentPath === null) {
                    return '/'
                } else {
                    return parentPath[0]
                }
            }
            return parentPathRegex.exec(relativePath)[0];
        } else {
            return '';
        }
    }
});