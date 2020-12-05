import {commandsList} from './src/modules/data/commands.js'

function getDescriptionCommand(com) {
    return commandsList[com].description;
}

function runCommand(com, a) {
    return commandsList[com].action(a)
}

// console.log(runCommand('pwd', 2))
