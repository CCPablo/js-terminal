import {Folder} from "../store/structure/folder.js";
import {Path} from "../store/structure/path.js";
import {getSources} from '../store/root.js'
import {getInputValue, appendToInput, getCaretPosition} from "./access.js";
import {decodeInstruction} from "../util/decode.js";

document.addEventListener('keydown', (event) => {
    if (event.key === "Tab") {
        event.preventDefault();
        const decoded = decodeInstruction(getInputValue());
        if (caretUnderCommand(decoded.command.length)) {
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
        const word = /\S+$/.exec(getInputValue().slice(0, caretPosition));
        if (word === null) {
            return '';
        } else {
            return word[0];
        }
    }
});

function autocomplete(relativePath = "") {
    const letters = new Path().appendRelative(relativePath, true).getChild();

    let equivalences = getSources(relativePath, !letters ? 0 : 1, (source) => source[0].startsWith(letters)).sources;
    if (equivalences.length === 0) {
        return '';
    } else if (equivalences.length === 1) {
        return equivalences[0].name.slice(letters.length) + endChar(equivalences[0].value instanceof Folder);
    } else {
        return getWordBeforeConflict().slice(letters.length)
    }

    function endChar(isFolder) {
        return isFolder ? '/' : '&nbsp;'
    }

    function getWordBeforeConflict() {
        equivalences.sort((a, b) => b.name.length - a.name.length);
        const maxWord = equivalences[0].name;
        let result = false;

        for (let i = letters.length; i <= maxWord.length; i++) {
            result = checkOdd(maxWord.slice(0, i));
            if (result) {
                break;
            }
        }
        return result;
    }

    function checkOdd(word) {
        for (let i = 0; i < equivalences.length; i++) {
            if (!equivalences[i].name.startsWith(word)) {
                return word.slice(0, -1);
            }
        }
        return false;
    }
}
