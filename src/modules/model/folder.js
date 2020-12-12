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
        return this.folders[name];
    }

    addFile = function (name, content = '') {
        if (this.hasFile(name)) {
            throw FILE_EXISTS_MSG(name);
        }
        this.files[name] = new File(name, content);
        return this.files[name];
    }

    removeFolder = function (name) {
        delete this.folders[name];
    }

    removeFile = function (name) {
        delete this.files[name];
    }

    getFolder = function (name) {
        if(!this.hasFolder(name)) {
            throw FOLDER_DOES_NOT_EXIST_MSG(name);
        }
        return this.folders[name];
    }

    getFile = function (name) {
        if(!this.hasFile(name)) {
            throw FOLDER_DOES_NOT_EXIST_MSG(name);
        }
        return this.files[name];
    }

    getFolders = function() {
        return Object.values(this.folders);
    }

    getFiles = function() {
        return Object.values(this.files);
    }

    getFolderNames = function () {
        return Object.keys(this.folders);
    }

    getFileNames = function () {
        return Object.keys(this.files);
    }

    getSourceNames = function() {
        const sourcesNames = this.getFileNames().concat(this.getFolderNames());
        sourcesNames.sort();
        return sourcesNames;
    }

    hasFolder = function (folderName) {
        return Object.keys(this.folders).includes(folderName);
    }

    hasFile = function (fileName) {
        return Object.keys(this.files).includes(fileName);
    }

    forEach = function (callback) {
        let folderPath = [];
        forEach(this);

        function forEach(folder, folderName = []) {
            for(let name in folder.folders) {
                folderPath.push(name);
                forEach(folder.folders[name], name);
                folderPath.pop();
            }
            callback(folder, folderName, folderPath);
        }
    }

    map = function (callback) {
        let folderPath = [];
        return map(this.clone(), callback);

        function map(folder, folderName = []) {
            for(let name in folder.folders) {
                folderPath.push(name);
                folder.folders[name] = map(folder.folders[name].clone(), name);
                folderPath.pop();
            }
            return callback(folder, folderName, folderPath);
        }
    }

    reduce = function(callback, accumulated = 0) {
        let folderPath = [];
        return reduce(this);

        function reduce(folder, folderName = []) {
            for(let name in folder.folders) {
                folderPath.push(name);
                reduce(folder.folders[name], name);
                folderPath.pop();
            }
            accumulated = callback(accumulated, folder, folderName, folderPath);
            return accumulated;
        }
    }

    filter = function (callback) {
        let folderPath = [];
        let validFolders = [];
        filter(this);
        return validFolders;

        function filter(folder, folderName = []) {
            for(let name in folder.folders) {
                folderPath.push(name);
                filter(folder.folders[name], name);
                folderPath.pop();
            }
            if(callback(folder, folderName, folderPath)) {
                validFolders.push(folder);
            }
        }
    }

    filterStructure = function (callback) {
        let folderPath = [];
        return filterStructure(this.clone());

        function filterStructure(folder, folderName = []) {
            for(let name in folder.folders) {
                if(callback(folder.folders[name], folderName, folderPath)) {
                    folderPath.push(name);
                    folder.folders[name] = filterStructure(folder.folders[name].clone(), name);
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
}
