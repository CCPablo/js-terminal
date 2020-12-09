import { getAbsolutPath } from "../state/folders.js";

const terminalBody = document.querySelector('.terminal__body');

function appendOutput(text) {
    if(text)  {
        const output = document.createElement('div');
        output.classList.add('terminal__output')
        output.innerHTML = text;
        terminalBody.appendChild(output);
    }
    appendInput();
}

function appendInput() {
    document.querySelectorAll('.terminal__input.active').forEach(input => {
        input.addEventListener('mousedown', preventDefault)
        input.addEventListener('keydown', preventDefault)
        input.classList.remove('active');
    });

    const inputWrapper = createInputWrapper();
    terminalBody.appendChild(inputWrapper);
}
appendInput();

function createInputWrapper() {
    const inputWrapper = document.createElement('div');
    inputWrapper.classList.add('terminal__input-wrapper')
    const input = document.createElement('div');
    input.setAttribute('contentEditable', true);
    input.classList.add('terminal__input', 'active');
    input.setAttribute('spellcheck', false);
    const path = document.createElement('span');
    path.innerHTML = getAbsolutPath() + ' >>>';
    path.classList.add('terminal__path');
    inputWrapper.appendChild(path);
    inputWrapper.appendChild(input);

    window.requestAnimationFrame(() => {
        input.focus();
        input.style.textIndent = (path.offsetWidth + 10) + 'px';
    })
    return inputWrapper;
}

let preventDefault = e => e.preventDefault();

function clearOutput() {
    document.querySelectorAll('.terminal__input').forEach(input => {
        input.removeEventListener('mousedown', preventDefault)
        input.removeEventListener('keydown', preventDefault)
    });
    terminalBody.innerHTML = '';
}

export { appendOutput, clearOutput }