import {File} from './file.js'

export {Folder}

const FOLDER_EXISTS_MSG = function (folderName) {
    return `A folder with name ${folderName} already exists in directory`;
}

const FILE_EXISTS_MSG = function (fileName) {
    return `A file with name ${fileName} already exists in directory`;
}

class Folder {
    constructor(files = {}, folders = {}, shortcut = undefined) {
        this.files = files;
        this.folders = folders;
        this.shortcut = shortcut;
    }

    addFolder = function (name, files = {}, folders = {}, shortcut = undefined) {
        if (this.hasFolder(name)) {
            throw FOLDER_EXISTS_MSG(name);
        }
        this.folders[name] = new Folder(files, folders, shortcut);
    }

    addFile = function (name, content = '') {
        if (this.hasFile(name)) {
            throw FILE_EXISTS_MSG(name);
        }
        this.files[name] = new File(name, content);
    }

    getFolderNames = function () {
        return Object.keys(this.folders);
    }

    getFileNames = function () {
        return Object.keys(this.files);
    }

    getSources = function() {
        return this.getFileNames().concat(this.getFolderNames())
    }

    hasFolder = function (folderName) {
        return Object.keys(this.folders).includes(folderName);
    }

    hasFile = function (fileName) {
        return Object.keys(this.files).includes(fileName);
    }
}
