import {Command} from "../../commands/model/command.js";

import {manCat, manCd, manClear, manEcho, manLs, manMkdir, manMv, manPwd, manRm, manHelp, manMan} from '../../manual/manFileReferenceCaller.js';
import {changePath, getPath, getSources, removeSources} from "../../store/root.js";
import {Folder} from "../../store/structure/folder.js";

export const linuxSharedCommands = {
    cd: new Command(
        'cd - change the shell working directory.',
        manCd.All,
        (argumentList) => {
            changePath(argumentList[0]);
        }
    ),
    rm: new Command(
        'rm - remove files or directories ',
        manRm.All,
        (argumentList, parameterList) => {
            const deleted = argumentList.map(path => removeSources(path, (name, value, child) => {
                if (value instanceof Folder) {
                    return parameterList.includes("-r") && asteriskCondition(name, value, child);
                } else {
                    return asteriskCondition(name, value, child);
                }
            }));
            console.log(deleted)
        }
    ),
    mv: new Command(
        'mv - move (rename) files ',
        manMv.All,
        (argumentList, parameterList) => {}
    ),
    ls: new Command(
        'ls - list directory contents',
        manLs.All,
        (argumentList, parameterList) => {
            let sortedCondition;
            if (parameterList.includes('-S')) {
                sortedCondition = orderBySize;
            } else if (parameterList.includes('-t')) {
                sortedCondition = orderByTimestamp;
            }
            if (argumentList.length === 0) {
                return getSources().sort(sortedCondition).map((source => source.name)).join(' ');
            } else {
                return argumentList.map(path => {
                    console.log(getSources(path).map(source => source.value.timestamp).join(' '))
                    return getSources(path).map(source => source.name).join(' ')
                }).join('<br>');
            }
            function orderByTimestamp(a, b) {
                return a.value.timestamp - b.value.timestamp
            }
            function orderBySize(a, b) {
                return a.value.getSize() - b.value.getSize()
            }
        }
    ),
    pwd: new Command(
        'print name of current/working directory',
        manPwd.All,
        () => {
            return getPath();
        }
    ),
}


const asteriskCondition = (name, _, child) => {
    const manyCondition =
        child.includes("*")
        && name.startsWith(child.slice(0, child.indexOf("*")))
        && name.endsWith(child.slice(child.indexOf("*") + 1));

    return child === name || manyCondition;
}
