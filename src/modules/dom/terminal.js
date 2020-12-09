export { appendOutput, clearOutput }

const terminalBody = document.querySelector('.terminal__body');
const terminalInput = document.querySelector('.terminal__input')
const terminalOutput = document.getElementById('terminal__output');

function appendOutput(text = "") {
    const output = document.createElement('div');
    output.classList.add('terminal__output')
    output.innerHTML = text;
    terminalBody.appendChild(output);
    appendInput();
}

function appendInput() {
    document.querySelectorAll('.terminal__input.active').forEach(input => {
        input.addEventListener('mousedown', e => e.preventDefault())
        input.addEventListener('keydown', e => e.preventDefault())
        input.classList.remove('active');
    });

    const inputWrapper = document.createElement('div');
    inputWrapper.classList.add('terminal__input-wrapper')
    const input = document.createElement('div');
    input.setAttribute('contentEditable', true);
    input.classList.add('terminal__input', 'active');
    input.setAttribute('spellcheck', false);
    const path = document.createElement('span');
    path.innerHTML = 'path >>>';
    path.classList.add('terminal__path');
    inputWrapper.appendChild(path);
    inputWrapper.appendChild(input);
    terminalBody.appendChild(inputWrapper);
}

appendInput();
appendOutput()
appendInput();

function clearOutput() {
    terminalOutput.innerHTML = '';
}