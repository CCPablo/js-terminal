import { Command } from "../../commands/model/command.js";
import { COMMAND_MSG_ERROR, Fail, IS_DIR_FAIL } from "../../fail/fail.js";

import { manCd, manLs, manMv, manPwd, manRm} from '../../manual/manFileReferenceCaller.js';
import { changePath, getPath, getSources, removeSources, addSources } from "../../store/root.js";
import { Folder } from "../../store/structure/folder.js";
import { Path } from "../../store/structure/path.js";
import { appendOutput } from "../../terminal/access.js";
import { asteriskCondition } from '../util/condition.js'

export const linuxSharedCommands = {
    cd: new Command(
        'cd - change the shell working directory.',
        manCd.All,
        (argumentList) =>  {
            changePath(argumentList[0]);
        }
    ),
    rm: new Command(
        'rm - remove files or directories ',
        manRm.All,
        (argumentList, parameterList) => {
            argumentList.forEach(path => {
                try {
                    removeSources(path, (name, value, child) => {
                        if(value instanceof Folder && asteriskCondition(name,value,child)) {
                            if(!parameterList.includes("-r")) {
                                throw IS_DIR_FAIL();
                            }
                            return parameterList.includes("-r");
                        } else {
                            return asteriskCondition(name,value,child);
                        }
                    });
                } catch(fail) {
                    fail.addMessage(COMMAND_MSG_ERROR('rm', path))
                    fail.addMessage('rm');
                    appendOutput(fail.getFailMessage())
                }
            });
        }
    ),
    mv: new Command(
        'mv - move (rename) files ',
        manMv.All,
        (argumentList) => {
            const target = argumentList.splice(-1)[0];
            const validSources = argumentList.flatMap(path => {
                try{
                    return removeSources(path, asteriskCondition)
                } catch(fail) {
                    fail.addMessage(COMMAND_MSG_ERROR('mv_source', path));
                    fail.addMessage('mv');
                    appendOutput(fail.getFailMessage());
                }
            }).filter(value => value);

            if(validSources.flatMap(source => source.sources).length === 0) {
                return;
            }
            
            if(validSources.flatMap(source => source.sources).length === 1) {
                const source = validSources[0];
                const sourceName = source.sources[0].name;
                const child = new Path().appendRelative(target).getChild();
                source.sources[0].name = child;
                try{
                    addSources(target, 1, source.sources);
                } catch(fail) {
                    source.sources[0].name = sourceName;
                    fail.addMessage('mv');
                    appendOutput(fail.getFailMessage());
                    addSources(source.rawRelative, 1, source.sources);
                } 
            } else {
                try{
                    addSources(target, 0, validSources.flatMap(source => source.sources));
                } catch(fail) {
                    fail.popMessage();
                    fail.addMessage(COMMAND_MSG_ERROR('mv_target', target));
                    fail.addMessage('mv');
                    appendOutput(fail.getFailMessage());
                    validSources.forEach(source => {
                        addSources(source.rawRelative, 1, source.sources);
                    })
                } 
            }
        }
    ),
    ls: new Command(
        'ls - list directory contents',
        manLs.All,
        (argumentList, parameterList) =>  {
            if(argumentList.length === 0) {
                return getSources().map(source => source.name).join(' ');
            } else {
                return argumentList.map(path => {
                    return getSources(path).map(source => source.name).join(' ')
                }).join('<br>');
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