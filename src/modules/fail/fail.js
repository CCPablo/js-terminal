import { getCurrentTerminal } from "../store/theme.js";

const PREDEFINED_MESSAGES = {
    windows: {
        no_source: (value) => 'No such file or directory',
        already_exists: (value) => `Source '${value}' already exists`,
        is_dir: (value) => 'Is a directory',
        rm: (value) => `cannot remove '${value}'`,
        mv_source: (value) => `cannot move '${value}'`,
        mv_target: (value) => `target '${value}' is not a directory`,
        mkdir: (value) => `cannot create directory '${value}'`,
    },
    mac: {
        no_source: (value) => 'No such file or directory',
        already_exists: (value) => `Source '${value}' already exists`,
        is_dir: (value) => 'Is a directory',
        rm: (value) => `cannot remove '${value}'`,
        mv_source: (value) => `cannot move '${value}'`,
        mv_target: (value) => `target '${value}' is not a directory`,
        mkdir: (value) => `cannot create directory '${value}'`,
    },
    debian: {
        no_source: (value) => 'No file or directory',
        already_exists: (value) => `Source '${value}' already exists`,
        is_dir: (value) => 'Is a directory',
        rm: (value) => `cannot remove '${value}'`,
        mv_source: (value) => `cannot move '${value}'`,
        mv_target: (value) => `target '${value}' is not a directory`,
        mkdir: (value) => `cannot create directory '${value}'`,
    },
}

class Fail {
    constructor() {
        let messages = [];
        [].forEach.call(arguments, (message) => {
            messages.push(this.terminalMap(message));
        });
        this.fails = [[...messages]];
    }

    popMessage() {
        this.fails.forEach(fail => fail.shift());
    }

    addMessages(messages) {
        const currentMessages = this.fails[0];
        messages.forEach(message => {
            this.fails.push([this.terminalMap(message)].concat(currentMessages));
        })
        this.fails.shift();
        return this;
    }

    addMessage(message) {
        this.fails.forEach(fail => fail.unshift(this.terminalMap(message)));
    }

    getFailMessage() {
        console.log(this.fails)
        return this.fails.map(fail => fail.join(': ')).join('<br>');
    }

    terminalMap(message) {
        console.log(message)
        if(!PREDEFINED_MESSAGES[getCurrentTerminal()][message.type]) {
            return message;
        } else {
            return PREDEFINED_MESSAGES[getCurrentTerminal()][message.type](message.value);
        }    
    }
}

const IS_DIR_FAIL = (value) => new Fail({type: 'is_dir', value:value});
const NO_SOURCE_FAIL = (value) =>  new Fail({type: 'no_source', value:value});
const ALREADY_EXIST_FAIL = (value) => new Fail({type: 'already_exists', value:value});
const COMMAND_MSG_ERROR = (command, argument) => {
    return {
        type: command, value:argument
    }
};

export { Fail, IS_DIR_FAIL, NO_SOURCE_FAIL, ALREADY_EXIST_FAIL, COMMAND_MSG_ERROR }