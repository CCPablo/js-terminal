import { Folder } from '../model/folder.js'

let rootFolder = new Folder();

let currentPath = [];

function getActiveFolder() {
    return currentPath.reduce((parent, child) =>  parent.folders[child], rootFolder)
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

export { getActiveFolder, enterFolder, exitFolder, getPath }