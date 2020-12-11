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
        iterate(this, callback);

        function iterate(folder, callback, folderName = []) {
            const folderPathCopy = [...folderPath];
            folderPath = folderPath.concat(folderName);
            for(let fold in folder.folders) {
                iterate(folder.folders[fold], callback, fold);
                folderPath = folderPathCopy;
            }
            callback(folder, folderName, folderPathCopy);
        }
    }

    map = function (callback) {
        let folderPath = [];
        return iterate(this, callback);

        function iterate(folder, callback, folderName = []) {
            const folderPathCopy = [...folderPath];
            folderPath = folderPath.concat(folderName);
            let foldersCopy = {...folder.folders};
            for(let fold in foldersCopy) {
                foldersCopy[fold] = iterate(foldersCopy[fold], callback, fold);
                folderPath = folderPathCopy;
            }
            return callback(new Folder(folder.files, foldersCopy), folderName, folderPathCopy);
        }
    }

    reduce = function(callback, accumulated = 0) {
        let folderPath = [];
        return iterate({...this}, callback);

        function iterate(folder, callback, folderName = []) {
            const folderPathCopy = [...folderPath];
            folderPath = folderPath.concat(folderName);
            let foldersCopy = {...folder.folders};
            for(let fold in foldersCopy) {
                iterate(foldersCopy[fold], callback, fold);
                folderPath = folderPathCopy;
            }
            accumulated = callback(folder, accumulated, folderName, folderPathCopy);
            return accumulated;
        }
    }

    filter = function (callback) {
        let folderPath = [];
        let validFolders = [];
        iterate(this, callback);
        return validFolders;

        function iterate(folder, callback, folderName = []) {
            const folderPathCopy = [...folderPath];
            folderPath = folderPath.concat(folderName);
            for(let fold in folder.folders) {
                iterate(folder.folders[fold], callback, fold);
                folderPath = folderPathCopy;
            }
            if(callback(folder, folderName, folderPath)) {
                validFolders.push(folder);
            }
        }
    }

    filterStructure = function (callback) {
        let folderPath = [];
        return iterate({...this}, callback);

        function iterate(folder, callback, folderName = []) {
            const folderPathCopy = [...folderPath];
            folderPath = folderPath.concat(folderName);
            let foldersCopy = {...folder.folders};
            for(let fold in foldersCopy) {
                if(callback(folder, folderName, folderPath)) {
                    foldersCopy[fold] = iterate(foldersCopy[fold], callback, fold);
                } else {
                    console.log('eeeeo')
                    delete foldersCopy[fold];
                }
                folderPath = folderPathCopy;
            }
            return new Folder(folder.files, foldersCopy);
            
        }
    }

    deepClone = function () {
        return clone({...this});

        function clone(folder) {
            const foldersClone = {...folder.folders};
            for(let fold in foldersClone) {
                foldersClone[fold] = clone(foldersClone[fold]);
            }
            return new Folder({...folder.files}, foldersClone);
        }
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
