import {Command} from "../../commands/model/command.js";

import {manCat, manCd, manClear, manEcho, manLs, manMkdir, manMv, manPwd, manRm, manHelp, manMan, manTouch} from '../../manual/manFileReferenceCaller.js';
import {Folder} from "../../store/structure/folder.js";
import {Directory} from "../../store/structure/directory.js";

import {changePath, getPath, getSources, removeSources, addSources, getAllSources} from "../../store/root.js";

import {Path} from "../../store/structure/path.js";
import {appendOutput} from "../../terminal/access.js"

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
        }
    ),
    touch: new Command(
        'touch -- change file access and modification times',
        manTouch.All,
        (argumentList, parameterList) => {
            argumentList.forEach(file => {
                return createFile(file)
            });
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
            let showDetailed = false;
            let showRecursive = false;
            let headerTable = `<table class="ls__output__table" ><tr><th>Size</th><th>Date Modified</th><th>Name</th></tr></table>`

            if (parameterList.includes('-S')) {
                sortedCondition = orderBySize;
            } else if (parameterList.includes('-t')) {
                sortedCondition = orderByTimestamp;
            }

            if (parameterList.includes('-l')) {
                showDetailed = true;
            }

            if (parameterList.includes('-R')) {
                showRecursive = true;
            }

            if (argumentList.length === 0) {
                if (showDetailed) {
                    return headerTable + '<br>' + getSources().sources.sort(sortedCondition).map((source => {
                        let date = new Date(source.value.lastModified);
                        const monthNames = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
                        let dayAndMonth = date.getDay() + ' ' + monthNames[date.getMonth()];
                        let minutes = '';
                        date.getMinutes() < 9 ? minutes = '0' + date.getMinutes() : minutes = date.getMinutes();
                        let time = date.getHours() + ':' + minutes;
                        let size = source.value.getSize()
                        size.toString().length >= 4 ? size = Math.round(size / 1000 * 10) + ' k' : size = ' &nbsp' + size + ' b';
                        return `<table class="ls__output__table"> <tr><td>${size}</td><td>${dayAndMonth}   ${time}</td><td>${source.name}</td></tr></table>`
                    })).join(' ');
                } else if (showRecursive) {
                    let sources = getAllSources();
                    return sources.map(source => {
                        const path = source.path
                        const fileNames = Object.keys(source.folder.files).join('  ')
                        const output = `<br><br><span class="ls__output__recursive">${path}:</span><br>${fileNames}`
                        return output;
                    });
                } else {
                    return getSources().sources.sort(sortedCondition).map((source => source.name)).join(' ');
                }
            } else {
                if (showDetailed) {
                    return argumentList.map(argument => {
                        return getSources(argument).sources.sort(sortedCondition).map((source => {
                            let date = new Date(source.value.lastModified);
                            const monthNames = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
                            let dayAndMonth = date.getDay() + ' ' + monthNames[date.getMonth()];
                            let minutes = '';
                            date.getMinutes() < 9 ? minutes = '0' + date.getMinutes() : minutes = date.getMinutes();
                            let time = date.getHours() + ':' + minutes;
                            let size = source.value.getSize()
                            size.toString().length >= 4 ? size = Math.round(size / 1000 * 10) + ' k' : size = ' &nbsp' + size + ' b';
                            return `<table class="ls__output__table"> <tr><td>${size}</td><td>${dayAndMonth}   ${time}</td><td>${source.name}</td></tr></table>`
                        })).join(' ');

                    })
                } else {
                    return argumentList.map(argument => {
                        let multi = argument.includes('*')
                        let sources = getSources(argument, multi ? 1 : 0, multi ? asteriskCondition : () => true);
                        if (argumentList.length === 1) {
                            return `${sources.sources.sort(sortedCondition).map(source => source.name).join(' ')}`
                        } return `/${sources.absolutPath.join('/')}:<br>
                        ${sources.sources.sort(sortedCondition).map(source => source.name).join(' ')}`
                    }).join('<br><br>')

                }
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
