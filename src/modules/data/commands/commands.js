import { windowsCommands } from './windows.js'
import { macCommands } from './mac.js'
import { debianCommands } from './debian.js'
import { sharedCommands } from './shared.js'

export const commandList = {
    'windows': {...windowsCommands, ...sharedCommands},
    'mac': {...macCommands, ...sharedCommands},
    'debian': {...debianCommands, ...sharedCommands}
}