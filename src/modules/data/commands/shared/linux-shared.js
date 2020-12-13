import { Command } from "../../model/command.js";

export const linuxSharedCommands = {
    cd: new Command(
        'cd - change the shell working directory.',
        manCd.All,
        (argumentList) =>  {
            changePath(argumentList[0]);
        }
    ),
}


