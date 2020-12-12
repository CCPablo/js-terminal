import {File} from './file.js'

export {Folder}

const FOLDER_EXISTS_MSG = function (folderName) {
    return `A folder with name ${folderName} already exists in directory`;
}

const FOLDER_DOES_NOT_EXIST_MSG = function (folderName) {
    return `Folder with name ${folderName} does not exists in directory`;
}

const FILE_EXISTS_MSG = function (fileName) {
    return `A file with name ${fileName} already exists in directory`;
}

class Folder {
    constructor(files = {}, folders = {}) {
        this.files = files;
        this.folders = folders;
    }

    addFolder = function (name, files = {}, folders = {}) {
        if (this.hasFolder(name)) {
            throw FOLDER_EXISTS_MSG(name);
        }
        this.folders[name] = new Folder(files, folders);
    }

    addFile = function (name, content = '') {
        if (this.hasFile(name)) {
            throw FILE_EXISTS_MSG(name);
        }
        this.files[name] = new File(name, content);
    }

    getFolder = function (name) {
        if(!this.hasFolder(name)) {
            throw FOLDER_DOES_NOT_EXIST_MSG(name);
        }
        return this.folders[name];
    }

    getFiles = function() {
        return Object.values(this.files);
    }

    getFile = function (name) {
        if(!this.hasFile(name)) {
            throw FOLDER_DOES_NOT_EXIST_MSG(name);
        }
        return this.files[name];
    }

    forEach = function (callback) {
        let folderPath = [];
        iterate(this);

        function iterate(folder, folderName = []) {
            for(let name in folder.folders) {
                folderPath.push(name);
                iterate(folder.folders[name], name);
                folderPath.pop();
            }
            callback(folder, folderName, folderPath);
        }
    }

    map = function (callback) {
        let folderPath = [];
        return iterate(this.clone(), callback);

        function iterate(folder, folderName = []) {
            for(let name in folder.folders) {
                folderPath.push(name);
                folder.folders[name] = iterate(folder.folders[name].clone(), name);
                folderPath.pop();
            }
            return callback(folder, folderName, folderPath);
        }
    }

    reduce = function(callback, accumulated = 0) {
        let folderPath = [];
        return iterate(this);

        function iterate(folder, folderName = []) {
            for(let name in folder.folders) {
                folderPath.push(name);
                iterate(folder.folders[name], name);
                folderPath.pop();
            }
            accumulated = callback(accumulated, folder, folderName, folderPath);
            return accumulated;
        }
    }

    filter = function (callback) {
        let folderPath = [];
        let validFolders = [];
        iterate(this);
        return validFolders;

        function iterate(folder, folderName = []) {
            for(let name in folder.folders) {
                folderPath.push(name);
                iterate(folder.folders[name], name);
                folderPath.pop();
            }
            if(callback(folder, folderName, folderPath)) {
                validFolders.push(folder);
            }
        }
    }

    filterStructure = function (callback) {
        let folderPath = [];
        return iterate(this.clone());

        function iterate(folder, folderName = []) {
            for(let name in folder.folders) {
                if(callback(folder.folders[name], folderName, folderPath)) {
                    folderPath.push(name);
                    folder.folders[name] = iterate(folder.folders[name].clone(), name);
                    folderPath.pop();
                } else {
                    delete folder.folders[name];
                }
            }
            return folder;
        }
    }
    
    clone = function () {
        const filesClone = {};
        for(const name in this.files) {
            filesClone[name] = new File(this.files[name].name, this.files[name].content);
        }
        const foldersClone = {...this.folders};
        return new Folder(filesClone, foldersClone);
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
