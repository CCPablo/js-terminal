import { setTerminal } from './store/theme.js'
import { historyInitialLoad } from "./store/history.js";
import { rootInitialLoad } from "./store/root.js";

const savedTheme = localStorage.getItem('theme');
if(savedTheme) {
    setTerminal(savedTheme);
}
const savedInstructionHistory = JSON.parse(localStorage.getItem('instructionHistory'));
if(savedInstructionHistory) {
    historyInitialLoad(savedInstructionHistory);
}
const savedRootFolder = JSON.parse(localStorage.getItem('root'));
if(savedRootFolder) {
    rootInitialLoad(savedRootFolder);
}