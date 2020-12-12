import { Path } from "./path.js";
import { Folder } from "./folder.js";

export class Directory {
    constructor() {
        this.absolutPath = new Path();
        this.rootFolder = new Folder();
    }

    //Public

    createFolder = function (rawRelativePath = "") {
        const path = this.getPath(rawRelativePath);
        return this.getFolder(path, 1).addFolder(path.getSource());
    }

    createFile = function (rawRelativePath = "") {
        const path = this.getPath(rawRelativePath);
        return this.getFolder(path, 1).addFile(path.getSource());
    }

    removeFolder = function (rawRelativePath = "") {
        const path = this.getPath(rawRelativePath);
        return this.getFolder(path, 1).removeFolder(path.getSource());
    }

    removeFile = function (rawRelativePath = "") {
        const path = this.getPath(rawRelativePath);
        return this.getFolder(path, 1).removeFile(path.getSource());
    }
    
    getSourceNames = function (rawRelativePath = "", levelsUp = 0) {
        const path = this.getPath(rawRelativePath);
        return this.getFolder(path, levelsUp).getSourceNames();
    }

    getSourcesNames = function (rawRelativePath = "", levelsUp = 0) {
        const path = this.getPath(rawRelativePath);
        return this.getFolder(path, levelsUp).getSourceNames();
    }
    
    enterFolder = function (rawRelativePath = "") {
        const path = this.getPath(rawRelativePath);
        if(this.folderExists(path)) {
            this.absolutPath.setPath(path.getPath());
        }
    }

    getRawPath = function () {
        return this.absolutPath.getRawPath();
    }

    //Private

    getPath = function(rawRelativePath = "") {
        return this.absolutPath.appendRelative(rawRelativePath);
    }

    getFolder = function (folderPath = this.absolutPath, levelsUp = 0) {
        return folderPath.getPath(levelsUp)
            .reduce((parentFolder, folderName) => parentFolder.getFolder(folderName), this.rootFolder);
    }
    
    folderExists = function (folderPath) {
        try {
            this.getFolder(folderPath);
        } catch(error) {
            throw 'folder does not exist';
        }
        return true;
    }
}