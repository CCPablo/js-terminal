import { setTerminal } from "../../state/store/theme.js";
import { Command } from "../model/command.js";

export const sharedCommands = {
    windows: new Command(
        'terminal - changes the terminal Mode',
        '',
        () => {
            setTerminal('windows')
        }
    ),
    mac: new Command(
        'terminal - changes the terminal Mode',
        '',
        () => {
            setTerminal('mac')
        }
    ),
    debian: new Command(
        'terminal - changes the terminal Mode',
        '',
        () => {
            setTerminal('debian')
        }
    )
}