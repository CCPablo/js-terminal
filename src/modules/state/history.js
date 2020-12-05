
const MAX_ITEMS = 50;

instructionHistory = [];

function addInstruction(instruction) {
    if(historyFull()) {
        instructionHistory.pop();
    }
    instructionHistory.unshift(instruction);
}

function getHistory(numberOfItems) {
    if(numberOfItems) {
        return instructionHistory.slice(0, numberOfItems)
    }
    return instructionHistory;
}

function historyFull() {
    return instructionHistory.length === MAX_ITEMS;
}