
import {Folder} from '../model/folder.js'

let rootFolder = new Folder();

let currentPath = [];

function getActiveFolder(relativePath = [], levelsUp = 0) {
    const path = currentPath.slice(0, currentPath.length - levelsUp)
                            .concat(relativePath);
    return path.reduce((parent, child) => parent.folders[child], rootFolder);
}

function getSources(relativePath = [], levelsUp = 0) {
    return getActiveFolder(relativePath, levelsUp).getSources();
}

/* TODO: Cuando entramos en la función EnterFolder, estamos cambiando la ruta. No queremos hacerlo hasta
    asegurarnos de que la ruta existe
function enterFolders(relativePath, levelsUp = 0) {
    const reducedPath = currentPath.slice(0, currentPath.length - levelsUp);
    relativePath.foreach(folderName => {
        enterFolder(folderName);
    })
    currentPath = reducedPath;
}
*/

function enterFolder(name) {
    if(getActiveFolder().hasFolder(name)) {
        currentPath.push(name);
    } else {
        throw 'folder does not exist';
    }
}

function exitFolder() {
    currentPath.pop();
}

function getPath() {
    return `/${currentPath.join('/')}`;
}

function splitPath(path) {
    return path.split('/');
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

logAction('display relative level -1')

console.log(getActiveFolder([], 1))

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




export {getActiveFolder, enterFolder, exitFolder, getPath, getSources}

