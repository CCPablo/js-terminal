
import {Folder} from '../model/folder.js'

let rootFolder = new Folder();

let currentPath = [];

function getFolder(foldersDown = [], levelsUp = 0) {
    return currentPath.slice(0, currentPath.length - levelsUp)
                        .concat(foldersDown)
                        .reduce((parentFolder, folderName) => parentFolder.getFolder(folderName), rootFolder);
}

function folderExists(foldersDown = [], levelsUp = 0) {
    try{
        getFolder(foldersDown, levelsUp)
    } catch (err) {
        return false;
    }
    return true;
}

function getSources(foldersDown = [], levelsUp = 0) {
    return getFolder(foldersDown, levelsUp).getSources();
}

function enterFolder(foldersDown, levelsUp) {
    if(folderExists(foldersDown, levelsUp)) {
        exitFolder(levelsUp);
        enterPath(foldersDown);        
    }
}

function exitFolder(levelsUp = 1) {
    currentPath.splice(-levelsUp, levelsUp);
}

function enterPath(foldersDown) {
    currentPath = currentPath.concat(foldersDown);
}

function getPath() {
    return `/${currentPath.join('/')}`;
}

function joinPath(path) {
    return `/${path.join('/')}`;
}

function splitPath(path) {
    return path.split('/');
}

////

logState();
logAction('add 3 files to root folder')

getFolder().addFile('file1.js')
getFolder().addFile('file2.js')
getFolder().addFile('file3.js')

logState();
logAction('add folder new folder and set active')

getFolder().addFolder('new folder')
enterFolder('new folder')

logState();
logAction('add file inside folder')

getFolder().addFile('file4.js')

logState();

logAction('display relative level -1')

logState();

function logState() {
    console.log('\n')
    console.log(getFolder());
    console.log(getPath())
    console.log('\n')
}

function logAction(action) {
    console.log('--> ' + action);
}




export {getFolder, enterFolder, exitFolder, getPath, getSources}

