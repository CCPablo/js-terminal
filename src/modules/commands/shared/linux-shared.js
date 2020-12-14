import {Command} from "../../commands/model/command.js";

import {manCat, manCd, manClear, manEcho, manLs, manMkdir, manMv, manPwd, manRm, manHelp, manMan} from '../../manual/manFileReferenceCaller.js';
import {changePath, getPath, getSources, removeSources, addSources} from "../../store/root.js";
import {Folder} from "../../store/structure/folder.js";
import {Path} from "../../store/structure/path.js";

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
        (argumentList, parameterList) => {
            const target = argumentList.splice(-1)[0];
            const deleted = argumentList.flatMap(path => removeSources(path, asteriskCondition));
            if (deleted.length === 1) {
                const child = new Path().appendRelative(target).getChild();
                deleted[0].name = child;
                addSources(target, 1, deleted);
            } else {
                addSources(target, 0, deleted);
            }
        }
    ),
    ls: new Command(
        'ls - list directory contents',
        manLs.All,
        (argumentList, parameterList) => {
            let sortedCondition = orderByName;

            if (parameterList.includes('-S')) {
                sortedCondition = orderBySize;
            } else if (parameterList.includes('-t')) {
                sortedCondition = orderByTimestamp;
            }

            if (argumentList.length === 0) {
                return getSources().sort(sortedCondition).map((source => source.name)).join(' ');
            } else {
                console.log(argumentList.map(path => {
                    return getSources(path).sort(sortedCondition);
                }));
                return argumentList.map(path => {
                    return getSources(path).sort(sortedCondition).map((source => source.name)).join(' ');
                }).join('<br>');
            }

            function orderByTimestamp(a, b) {
                return a.value.timestamp - b.value.timestamp
            }
            function orderBySize(a, b) {
                return a.value.getSize() - b.value.getSize()
            }
            function orderByName(a, b) {
                if (a.name > b.name) {return 1;}
                if (a.name < b.name) {return -1;}
                return 0;
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
