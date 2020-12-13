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
    constructor(files = {}, folders = {}, timestamp = Date.now(), lastModified = Date.now()) {
        this.files = files;
        this.folders = folders;
        this.timestamp = timestamp;
        this.lastModified = lastModified;
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
            return this.files[name];
        }
        this.files[name] = new File(name, content);
        return this.files[name];
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

    getFolders = function(condition = () => true) {
        return Object.entries(this.folders)
            .filter(condition)
            .map(entry =>  {
                return {
                    name: entry[0],
                    value: entry[1]
                }
            });
    }

    getFiles = function(condition = () => true) {
        return Object.entries(this.files)
            .filter(condition)
            .map(entry =>  {
                return {
                    name: entry[0], 
                    value: entry[1]
                }
            });
    }

    getSources = function(condition = () => true) {
        return this.getFolders(condition).concat(this.getFiles(condition));
    }

    removeSources = function (condition = () => true) {
        const deleted = [];
        for(let name in this.files) {
            if(condition(name, this.files[name])) {
                deleted.push({
                    name: name,
                    value: this.files[name]
                });
                delete this.files[name];
            }
        }
        for(let name in this.folders) {
            if(condition(name, this.folders[name])) {
                deleted.push({
                    name: name,
                    value: this.folders[name]
                });
                delete this.folders[name];
            }
        }
        return deleted;
    }

    getSize = function () {
        return this.reduce((acc, folder) => acc + folder.getFiles().reduce((acc, file) => acc+file.getSize(), 0))
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
