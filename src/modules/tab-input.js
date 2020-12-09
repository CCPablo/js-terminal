import { autocomplete } from './state/folders.js';
import { decode } from './filter-input.js'

const parentPathRegex = /\S+\//;
const lastWrodRegex = /\S+$/;
const input = document.querySelector('.terminal__input');

document.addEventListener('keydown', (event) => {
    if (event.key === "Tab") {
        event.preventDefault();
        const decoded = decode(input.value);
        if(!(input.selectionStart > decoded.command.length)) {
            return;
        }
        const pathToAutocomplete = getWordUnderCursor();
        const parentPath = getParentPath(pathToAutocomplete);
        const lettersToAutocomplete = pathToAutocomplete.replace(parentPath, "");
        input.value += autocomplete(parentPath, lettersToAutocomplete);
    }

    function getWordUnderCursor() {
        let caretPosition = input.value.indexOf(' ',input.selectionStart);
        if (caretPosition == -1) {
            caretPosition = input.value.length;
        }
        const word = lastWrodRegex.exec(input.value.slice(0, caretPosition));
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