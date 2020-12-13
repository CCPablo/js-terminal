import {runCommand} from './data/commands.js'

document.onkeypress = function (evt) {
    evt = evt || window.event;
    let charKey = evt.key;

    if (evt.ctrlKey) {
        switch (charKey) {
            case 'l':
                runCommand('clear')
                break
        }
    };
};