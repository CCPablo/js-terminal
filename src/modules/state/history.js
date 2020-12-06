
const MAX_ITEMS = 50;

const instructionHistory = [];

let currentIndex = 0;

function addToHistory(instruction) {
    currentIndex = 0;
    if(historyIsFull()) {
        instructionHistory.pop();
    }
    instructionHistory.unshift(instruction);
}

function getHistoryItem(direction) {
    if(direction === 'newer') {
        return instructionHistory[currentIsNewest() ? currentIndex-- : currentIndex];
    } else if(direction === 'older') {
        return instructionHistory[currentIsOldest() ? currentIndex++ : currentIndex];
    }
}

function currentIsNewest() {
    return currentIndex > 0;
}

function currentIsOldest() {
    return currentIndex < instructionHistory.length-1;
}

function getHistory(numberOfItems) {
    if(numberOfItems) {
        return instructionHistory.slice(0, numberOfItems)
    }
    return instructionHistory;
}

function historyIsFull() {
    return instructionHistory.length === MAX_ITEMS;
}

export { addToHistory, getHistoryItem, getHistory, historyIsFull }
