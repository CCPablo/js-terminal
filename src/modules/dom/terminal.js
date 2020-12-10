import { getAbsolutPath } from "../state/folders.js";

const terminalBody = document.querySelector('.terminal__body');
let activeInput;

function getInputValue() {
    console.log(activeInput.innerText);
    return activeInput.innerText;
}

function focusInput() {
    activeInput.focus();
}

function indentInput(pathWidth) {
    activeInput.style.textIndent = (pathWidth + 10) + 'px';
}

function appendOutput(text) {
    if(text)  {
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
    path.innerHTML = getAbsolutPath() + ' >>>';
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

let preventDefault = e => e.preventDefault();

export { setNewInput, appendOutput, clearOutput, getInputValue, focusInput }