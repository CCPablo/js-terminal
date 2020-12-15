import { changePath, getSources } from "../store/root.js";
import { Command } from "../commands/model/command.js";
import { manLs, manCd } from "../manual/manFileReferenceCaller.js"

export const windowsCommands = {
    // powershell siempre hace como ls -l
    ls: new Command(
        'ls - list directory contents',
        manLs.All,
        (argumentList, parameterLisat) =>  {
            const sources = getSources(argumentList[0]);
            return sources.map(source => source.name).join(' ');
        }
    ),
    // cuando se hace sin argumentos te muestra pwd
    cd: new Command(
        'cd - change the shell working directory.',
        manCd.All,
        (argumentList) =>  {
            changePath(argumentList[0]);
        }
    )
}

