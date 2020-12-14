import { getPath } from "../store/root.js";

export const terminalBody = document.querySelector('.terminal__body');
let activeInput;

function getInputValue() {
    return activeInput.innerText;
}

function setInputValue(string) {
    activeInput.innerHTML = string;
    resetCaret();
}

function appendToInput(string) {
    activeInput.innerHTML += string;
    resetCaret();
}

function focusInput() {
    activeInput.focus();
}

function indentInput(pathWidth) {
    activeInput.style.textIndent = (pathWidth + 10) + 'px';
}

function appendOutput(text) {
    if(text) {
        const output = document.createElement('div');
        output.classList.add('terminal__output')
        output.innerHTML = text;
        terminalBody.appendChild(output);
    }
}

function setNewInput() {
    fixCurrentInput();
    appendNewInput();
}

function fixCurrentInput() {
    activeInput.addEventListener('mousedown', preventDefault);
    activeInput.addEventListener('keydown', preventDefault);
}

function appendNewInput() {
    terminalBody.appendChild(createNewInput());
}

appendNewInput();

function createNewInput() {
    const inputWrapper = document.createElement('div');
    inputWrapper.classList.add('terminal__input-wrapper')
    activeInput = document.createElement('div');
    activeInput.setAttribute('contentEditable', true);
    activeInput.setAttribute('spellcheck', false);
    activeInput.classList.add('terminal__input', 'active');
    const path = document.createElement('span');
    path.innerHTML = getPath() + ' ';
    path.classList.add('terminal__path');
    inputWrapper.appendChild(path);
    inputWrapper.appendChild(activeInput);

    window.requestAnimationFrame(() => {
        focusInput();
        indentInput(path.offsetWidth);
    })
    return inputWrapper;
}

function clearOutput() {
    terminalBody.querySelectorAll('.terminal__input').forEach(input => {
        input.removeEventListener('mousedown', preventDefault)
        input.removeEventListener('keydown', preventDefault)
    });
    terminalBody.innerHTML = '';
}

function getCaretPosition() {
    var caretOffset = 0;
    var doc = activeInput.ownerDocument || activeInput.document;
    var win = doc.defaultView || doc.parentWindow;
    var sel;
    if (typeof win.getSelection != "undefined") {
        sel = win.getSelection();
        if (sel.rangeCount > 0) {
            var range = win.getSelection().getRangeAt(0);
            var preCaretRange = range.cloneRange();
            preCaretRange.selectNodeContents(activeInput);
            preCaretRange.setEnd(range.endContainer, range.endOffset);
            caretOffset = preCaretRange.toString().length;
        }
    } else if ( (sel = doc.selection) && sel.type != "Control") {
        var textRange = sel.createRange();
        var preCaretTextRange = doc.body.createTextRange();
        preCaretTextRange.moveToElementText(activeInput);
        preCaretTextRange.setEndPoint("EndToEnd", textRange);
        caretOffset = preCaretTextRange.text.length;
    }
    return caretOffset;
}

function resetCaret() {
    window.requestAnimationFrame(() => {
        const inputValueLength = getInputValue().length;
        if(inputValueLength === 0) {
            return;
        }
        var range = document.createRange();
        var sel = window.getSelection();
        range.setStart(activeInput.childNodes[0], inputValueLength);
        range.collapse(true);
        
        sel.removeAllRanges();
        sel.addRange(range);
    })
}

let preventDefault = e => e.preventDefault();

export { setNewInput, appendOutput, clearOutput, getInputValue, setInputValue, getCaretPosition, appendToInput, focusInput }