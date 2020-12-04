import { File } from './file.js'

export { Folder }

const FOLDER_EXISTS_MSG = function(folderName) {
    return `A folder with name ${name} already exists in directory`;
}

const FILE_EXISTS_MSG = function(fileName) {
    return `A file with name ${fileName} already exists in directory`;
}

class Folder {
    constructor(path, files = [], folders = [], shortcut = undefined) {
        this.path = path;
        this.files = files;
        this.folders = folders;
        this.shortcut = shortcut;
    }

    addFolder = function(name, files = [], folders = [], shortcut = undefined) {
        if(!this.folderNameAvailable(name)) {
            throw FOLDER_EXISTS_MSG(name);
        }
        this.folders.push(new Folder([...this.path, name], files, folders, shortcut));
    }

    addFile = function(name, content = '') {
        if(!this.fileNameAvailable(name)) {
            throw FILE_EXISTS_MSG(name);
        }
        this.files.push(new File(name, content));
    }

    getFullPath = function() {
        return `/${this.path.join('/')}`;
    }

    getName = function() {
        return this.path[this.path.length-1];
    }

    setName = function(name) {
        this.path[this.path.lenght-1] = name;
    }

    getFolderNames = function() {
        return this.folders.map(folder => folder.getFolderName());
    }

    getFileNames = function() {
        return this.files.map(file => file.getName());
    }

    fileNameAvailable = function(fileName) {
        return !this.files.some(file => file.getName() === fileName);
    }

    folderNameAvailable = function(folderName) {
        return !this.folders.some(folder => folder.getName() === folderName);
    }
}