
import {Folder} from '../model/folder.js'

let rootFolder = new Folder();

let currentPath = [];

function getActiveFolder(foldersDown = [], levelsUp = 0) {
    const path = currentPath.slice(0, currentPath.length - levelsUp)
                            .concat(foldersDown);
    return path.reduce((parentFolder, folderName) =>  {
        if(!parentFolder.hasFolder(folderName)) {
            console.log('reooo', parentFolder)
            throw `Folder ${folderName} does not exists`;
        }
        console.log(parentFolder)
        return parentFolder.folders[folderName];
    }, rootFolder);
}

function getSources(foldersDown = [], levelsUp = 0) {
    return getActiveFolder(foldersDown, levelsUp).getSources();
}

/* TODO: Cuando entramos en la función EnterFolder, estamos cambiando la ruta. No queremos hacerlo hasta
    asegurarnos de que la ruta existe
function enterFolders(foldersDown, levelsUp = 0) {
    const reducedPath = currentPath.slice(0, currentPath.length - levelsUp);
    foldersDown.foreach(folderName => {
        enterFolder(folderName);
    })
    currentPath = reducedPath;
}
*/


function enterFolders(foldersDown, levelsUp) {
    const path = currentPath.slice(0, currentPath.length - levelsUp)
                            .concat(foldersDown);
}


function enterFolder(name) {
    console.log(getActiveFolder());
    if(getActiveFolder().hasFolder(name)) {
        currentPath.push(name);
    } else {
        throw `Folder with name ${name} does not exist in directory ${getPath()}`;
    }
}

function exitFolder() {
    currentPath.pop();
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

console.log(getActiveFolder(['ramon'], 2))

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

