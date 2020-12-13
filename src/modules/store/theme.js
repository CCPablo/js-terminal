import { commandList } from '../commands/commands.js'

let currentCommandList = commandList['windows'];

function getCommandList() {
    return currentCommandList;
}

function getCommand(command) {
    return currentCommandList[command];
}

function getCurrentTerminal() {
    return localStorage.getItem('theme');
}

function setTerminal(theme) {
    if(commandList.hasOwnProperty(theme)) {
        currentCommandList = commandList[theme];
        document.documentElement.className = theme;
        localStorage.setItem('theme', theme);
    } else {
        throw 'not available terminal';
    }
}

export { getCommand, getCommandList, setTerminal, getCurrentTerminal }