import { windowsCommands } from './windows.js'
import { macCommands } from './mac.js'
import { debianCommands } from './debian.js'
import { sharedCommands } from './shared/shared.js'
import { linuxSharedCommands } from './shared/linux-shared.js'

export const commandList = {
    windows: {...windowsCommands, ...sharedCommands},
    mac: {...macCommands, ...sharedCommands, ...linuxSharedCommands},
    debian: {...debianCommands, ...sharedCommands, ...linuxSharedCommands}
}