import { setTerminal } from './theme.js'
import { historyInitialLoad } from "./history.js";
import { rootInitialLoad } from "./root.js";

const savedTheme = localStorage.getItem('theme');
if(savedTheme) {
    setTerminal(savedTheme);
} else {
    setTerminal('windows');
}

const savedInstructionHistory = JSON.parse(localStorage.getItem('instructionHistory'));
if(savedInstructionHistory) {
    historyInitialLoad(savedInstructionHistory);
}
const savedRootFolder = JSON.parse(localStorage.getItem('root'));
if(savedRootFolder) {
    rootInitialLoad(savedRootFolder);
}