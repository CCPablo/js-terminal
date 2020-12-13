import { setTerminal } from "../../../state/store/theme.js";
import { Command } from "../../model/command.js";

export const sharedCommands = {
    mkdir: new Command(
        'mkdir - make directories',
        manMkdir.All,
        function mkdir(argumentList) {
            argumentList.forEach(path => createFolder(path));
        }
    ),
    windows: new Command(
        'windows - changes terminal to windows mode',
        '',
        () => {
            setTerminal('windows')
        }
    ),
    mac: new Command(
        'mac - changes terminal to mac mode',
        '',
        () => {
            setTerminal('mac')
        }
    ),
    debian: new Command(
        'debian - changes terminal to debian mode',
        '',
        () => {
            setTerminal('debian')
        }
    )
}