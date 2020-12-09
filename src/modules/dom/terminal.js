export { setOutput, clearOutput }

const terminalInput = document.querySelector('.terminal__input')
const terminalOutput = document.getElementById('terminal__output');

function setOutput(text) {
    let paragraph = document.createElement('p');
    paragraph.innerHTML = text;
    terminalOutput.appendChild(paragraph); 
}

function clearOutput() {
    terminalOutput.innerHTML = '';
}