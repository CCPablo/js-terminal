
import {Folder} from '../model/folder.js'


let rootFolder = new Folder();

let currentPath = [];

function getActiveFolder() {
    return currentPath.reduce((parent, child) => parent.folders[child], rootFolder)
}

function enterFolder(name) {
    currentPath.push(name);
}

function exitFolder() {
    currentPath.pop();
}

function getPath() {
    return `/${currentPath.join('/')}`;
}


////

logState();
logAction('add 3 files to root folder')

getActiveFolder().addFile('file1.js')
getActiveFolder().addFile('file2.js')
getActiveFolder().addFile('file3.js')

logState();
logAction('add folder new folder and set active')

getActiveFolder().addFolder('new folder')
enterFolder('new folder')

logState();
logAction('add file inside folder')

getActiveFolder().addFile('file4.js')

logState();

function logState() {
    console.log('\n')
    console.log(getActiveFolder());
    console.log(getPath())
    console.log('\n')
}

function logAction(action) {
    console.log('--> ' + action);
}




export {getActiveFolder, enterFolder, exitFolder, getPath}

