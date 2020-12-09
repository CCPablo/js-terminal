export { getTerminalInput, getTerminalOutput, setOutput }

const terminalInput = document.querySelector('.terminal__input')
const terminalOutput = document.getElementById('terminal__output');

function getTerminalInput() {
    return terminalInput;
}

function getTerminalOutput() {
    return terminalOutput;
}

function setOutput(text) {
    let paragraph = document.createElement('p');
    echoThis.innerHTML = text;
    terminalOutput.appendChild(paragraph); 
}

function clearOutput() {
    terminalOutput.innerHTML = '';
}