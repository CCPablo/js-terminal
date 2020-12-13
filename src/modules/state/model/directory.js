import { Path } from "./path.js";
import { Folder } from "./folder.js";

export class Directory {
    constructor() {
        this.absolutPath = new Path();
        this.rootFolder = new Folder();
    }

    //Public

    load = function (folder) {
        this.rootFolder = folder;
    }

    createFolder = function (rawRelativePath = "") {
        const path = this.getPath(rawRelativePath);
        return this.getParentFolder(path).addFolder(path.getChild());
    }

    createFile = function (rawRelativePath = "") {
        const path = this.getPath(rawRelativePath);
        return this.getParentFolder(path).addFile(path.getChild());
    }

    enterFolder = function (rawRelativePath = "") {
        const path = this.getPath(rawRelativePath);
        if(this.folderExists(path)) {
            this.absolutPath.setPath(path.getPath());
        }
    }

    getSources = function (rawRelativePath = "", levelsUp = 0, condition = () => true) {
        const path = this.getPath(rawRelativePath);
        return this.getFolder(path, levelsUp).getSources(condition);
    }
    
    getFileContent = function (rawRelativePath) {
        const path = this.getPath(rawRelativePath);
        let fileName = path.getChild();

        if(fileName.includes("*")) {
            return this.getParentFolder(path)
                .getFiles(file => file[0].startsWith(fileName.slice(0, fileName.indexOf("*"))))
                .reduce((acc, file) => acc + file.value.getContent(), '');
        } else {
            return this.getFolder(path, 1).getFile(fileName).getContent();
        }
    }

    setFileContent = function (rawRelativePath, content) {
        const path = this.getPath(rawRelativePath);
        const fileName = path.getChild();

        if(fileName.includes("*")) {
            this.getParentFolder(path)
                .getFiles(file => file[0].startsWith(fileName.slice(0, fileName.indexOf("*"))))
                .forEach(file => file.value.setContent(content));
        } else {
            this.getParentFolder(path).addFile(fileName).setContent(content);
        }
    }

    appendFileContent = function (rawRelativePath, content) {
        const path = this.getPath(rawRelativePath);
        const fileName = path.getChild();

        if(fileName.includes("*")) {
            this.getParentFolder(path)
                .getFiles(file => file[0].startsWith(fileName.slice(0, fileName.indexOf("*"))))
                .forEach(file => file.value.appendContent(content));
        } else {
            this.getParentFolder(path).addFile(fileName).appendContent(content);
        }
    }

    removeSources = function (rawRelativePath = "", includesFolders) {
        const path = this.getPath(rawRelativePath);
        const name = path.getChild();

        if(name.endsWith("*")) {
            this.getParentFolder(path)
                .removeSources(source => source.startsWith(name.slice(0, name.indexOf("*"))), includesFolders);
        } else if(name.startsWith("*")) {
            this.getParentFolder(path)
                .removeSources(source => source.endsWith(name.slice(name.indexOf("*")+1)), includesFolders);
        } else {
            this.getParentFolder(path).removeSources(source => source === name, includesFolders);
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

    getParentFolder = function(folderPath = this.absolutPath) {
        return folderPath.getPath(1)
            .reduce((parentFolder, folderName) => parentFolder.getFolder(folderName), this.rootFolder);
    }
    
    folderExists = function (folderPath) {
        try {
            this.getFolder(folderPath);
        } catch(error) {
            throw error;
        }
        return true;
    }
}