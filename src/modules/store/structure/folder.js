import { ALREADY_EXIST_FAIL, NO_SOURCE_FAIL } from '../../fail/fail.js';
import {File} from './file.js'
export {Folder}

class Folder {
    constructor(files = {}, folders = {}, timestamp = Date.now(), lastModified = Date.now()) {
        this.files = files;
        this.folders = folders;
        this.timestamp = timestamp;
        this.lastModified = lastModified;
    }

    createFolder = function (name, files = {}, folders = {}, timestamp = Date.now(), lastModified = Date.now()) {
        if (this.hasFolder(name)) {
            throw ALREADY_EXIST_FAIL(name);
        }
        this.folders[name] = new Folder(files, folders, timestamp, lastModified);
        return this.folders[name];
    }

    createFile = function (name, content = '', timestamp = Date.now(), lastModified = Date.now()) {
        if (this.hasFile(name)) {
            throw ALREADY_EXIST_FAIL(name);  
        }
        this.files[name] = new File(name, content, timestamp, lastModified);
        return this.files[name];
    }

    addFolder = function (name, folder) {
        if (this.hasFolder(name)) {
            throw ALREADY_EXIST_FAIL(name);
        }
        this.folders[name] = folder;
        return this.folders[name];
    }

    addFile = function (name, file) {
        if (this.hasFile(name)) {
            throw ALREADY_EXIST_FAIL(name);
        }
        this.files[name] = file;
        return this.files[name];
    }

    getFolder = function (name) {
        if(!this.hasFolder(name)) {
            throw NO_SOURCE_FAIL(name);
        }
        return this.folders[name];
    }

    getFile = function (name) {
        if(!this.hasFile(name)) {
            throw NO_SOURCE_FAIL(name);
        }
        return this.files[name];
    }

    getFolders = function (condition = () => true) {
        return Object.entries(this.folders)
            .filter(condition)
            .map(entry => {
                return {
                    name: entry[0],
                    value: entry[1]
                }
            });
    }

    getFiles = function (condition = () => true) {
        return Object.entries(this.files)
            .filter(condition)
            .map(entry => {
                return {
                    name: entry[0],
                    value: entry[1]
                }
            });
    }

    getSources = function (condition = () => true) {
        return this.getFolders(condition).concat(this.getFiles(condition));
    }

    getAllSources = function (condition = () => true) {
        return this.map((folder, _, path) => {
            return {
                path: path.join('/'),
                folder: folder,
            }
        })
    }

    addSources = function (sources) {
        sources.forEach(source => {
            if(source.value instanceof Folder) {
                this.addFolder(source.name, source.value)
            } else if(source.value instanceof File) {
                this.addFile(source.name, source.value)
            }
        })
    }

    createSources = function(sources) {
        sources.forEach(source => {
            if(source.value instanceof Folder) {
                this.createFolder(source.name, source.value.files, source.value.folders, source.value.timestamp, source.value.lastModified);
            } else if(source.value instanceof File) {
                this.createFile(source.name, source.content, source.timestamp, source.lastModified);
            }
                
            if (source.value instanceof Folder) {
                this.addFolder(source.name, source.value.files, source.value.folders, source.value.timestamp, source.value.lastModified);
            } else if (source.value instanceof File) {
                this.addFile(source.name, source.content, source.timestamp, source.lastModified);
            }
        })
    }

    removeSources = function (condition = () => true) {
        const deleted = [];
        for (let name in this.files) {
            if (condition(name, this.files[name])) {
                deleted.push({
                    name: name,
                    value: this.files[name]
                });
                delete this.files[name];
            }
        }
        for (let name in this.folders) {
            if (condition(name, this.folders[name])) {
                deleted.push({
                    name: name,
                    value: this.folders[name]
                });
                delete this.folders[name];
            }
        }
        if(deleted.length === 0) {
            throw NO_SOURCE_FAIL();
        }
        return deleted;
    }

    getSize = function () {
        return this.reduce((acc, folder) => {
            return acc + folder.getFiles().reduce((acc, file) => {
                return acc + file.value.getSize();
            }, 0);
        }, 0)
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
            for (let name in folder.folders) {
                folderPath.push(name);
                forEach(folder.folders[name], name);
                folderPath.pop();
            }
            callback(folder, folderName, folderPath);
        }
    }

    map = function (callback) {
        let folderPath = [];
        let folders = [];
        forEach(this);
        return folders;

        function forEach(folder, folderName = []) {
            for(let name in folder.folders) {
                folderPath.push(name);
                forEach(folder.folders[name], name);
                folderPath.pop();
            }
            folders.push(callback(folder, folderName, [...folderPath]))
        }
    }

    reduce = function (callback, accumulated = 0) {
        let folderPath = [];
        return reduce(this);

        function reduce(folder, folderName = []) {
            for (let name in folder.folders) {
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
            for (let name in folder.folders) {
                folderPath.push(name);
                filter(folder.folders[name], name);
                folderPath.pop();
            }
            if (callback(folder, folderName, folderPath)) {
                validFolders.push(folder);
            }
        }
    }

    filterStructure = function (callback) {
        let folderPath = [];
        return filterStructure(this.clone());

        function filterStructure(folder, folderName = []) {
            for (let name in folder.folders) {
                if (callback(folder.folders[name], folderName, folderPath)) {
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
        for (const name in this.files) {
            filesClone[name] = new File(this.files[name].name, this.files[name].content);
        }
        const foldersClone = {...this.folders};
        return new Folder(filesClone, foldersClone);
    }
}
