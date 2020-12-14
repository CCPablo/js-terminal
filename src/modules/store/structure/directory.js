import {Path} from "./path.js";
import {Folder} from "./folder.js";

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
        if (this.folderExists(path)) {
            this.absolutPath.setPath(path.getPath());
        }
    }

    addSources = function (rawRelativePath = "", levelsUp = 0, sources) {
        const path = this.getPath(rawRelativePath);
        return this.getFolder(path, levelsUp).addSources(sources);
    }

    getSources = function (rawRelativePath = "", levelsUp = 0, condition = () => true) {
        const path = this.getPath(rawRelativePath);
        let child = path.getChild();
        return {
            sources: this.getFolder(path, levelsUp).getSources(source => condition(source[0], source[1], child)),
            absolutPath: path.getPath(levelsUp)
        }
    }

    getFileContent = function (rawRelativePath, condition = (name, _, child) => name === child) {
        const path = this.getPath(rawRelativePath);
        let child = path.getChild();
        return this.getParentFolder(path)
            .getFiles(file => condition(file[0], file[1], child))
            .map(file => file.value.getContent());
    }

    setFileContent = function (rawRelativePath, content, condition = (name, _, child) => name === child) {
        const path = this.getPath(rawRelativePath);
        const child = path.getChild();
        return this.getParentFolder(path)
            .getFiles(file => condition(file[0], file[1], child))
            .map(file => file.value.setContent(content));
    }

    appendFileContent = function (rawRelativePath, content, condition = (name, _, child) => name === child) {
        const path = this.getPath(rawRelativePath);
        const child = path.getChild();
        return this.getParentFolder(path)
            .getFiles(file => condition(file[0], file[1], child))
            .map(file => file.value.appendContent(content));
    }

    removeSources = function (rawRelativePath = "", condition = (name, _, child) => name === child) {
        const path = this.getPath(rawRelativePath);
        const child = path.getChild();
        return this.getParentFolder(path)
            .removeSources((name, value) => condition(name, value, child));
    }

    getRawPath = function () {
        return this.absolutPath.getRawPath();
    }

    //Private

    getPath = function (rawRelativePath = "") {
        return this.absolutPath.appendRelative(rawRelativePath);
    }

    getFolder = function (folderPath = this.absolutPath, levelsUp = 0) {
        return folderPath.getPath(levelsUp)
            .reduce((parentFolder, folderName) => parentFolder.getFolder(folderName), this.rootFolder);
    }

    getParentFolder = function (folderPath = this.absolutPath) {
        return folderPath.getPath(1)
            .reduce((parentFolder, folderName) => parentFolder.getFolder(folderName), this.rootFolder);
    }

    folderExists = function (folderPath) {
        try {
            this.getFolder(folderPath);
        } catch (error) {
            throw error;
        }
        return true;
    }
}
