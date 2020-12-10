import { getInputValue, setInputValue } from '../dom/terminal.js'

const MAX_ITEMS = 50;

let instructionHistory = [];
let instructionPointer = -1;

let currentInputValue = '';
let currentlySearchingFlag = false;

document.addEventListener("DOMContentLoaded", () => {
    const savedInstructionHistory = JSON.parse(localStorage.getItem('instructionHistory'));
    if(savedInstructionHistory) {
        instructionHistory = savedInstructionHistory;
    }
});

document.addEventListener('keydown', e => {
    if(e.key === "ArrowUp" || e.key === "ArrowDown") {
        e.preventDefault();
        if(currentlySearchingFlag === false) {
            currentInputValue = getInputValue();
            currentlySearchingFlag = true;
        }
        processKeyInput(e.key);
    } else {
        currentlySearchingFlag = false;
    }
})

function processKeyInput(key) {
    if(key === "ArrowDown") {
        if(currentIsNewest()) {
            instructionPointer = -1;
            setInputValue(currentInputValue);
        } else {
            setInputValue(getHistoryItem(key));
        }
    } else if(key === "ArrowUp" && !currentIsOldest()) {
        setInputValue(getHistoryItem(key));
    }
}

function addToHistory(instruction) {
    instructionPointer = -1;
    if(historyIsFull()) {
        instructionHistory.pop();
    }
    instructionHistory.unshift(instruction);
    localStorage.setItem('instructionHistory', JSON.stringify(instructionHistory));
}

function getHistoryItem(direction) {
    direction === 'ArrowDown' ? instructionPointer-- : instructionPointer++;
    return instructionHistory[instructionPointer];
}

function currentIsNewest() {
    return instructionPointer <= 0;
}

function currentIsOldest() {
    return instructionPointer === instructionHistory.length-1;
}

function historyIsFull() {
    return instructionHistory.length === MAX_ITEMS;
}

export { addToHistory }
