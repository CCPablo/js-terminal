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

    removeSources = function (rawRelativePath = "", includesFolders) {
        const path = this.getPath(rawRelativePath);
        const name = path.getSource();
        if(name === "*") {
            this.getFolder(path, 1).removeSources(()=>true,includesFolders);
        } else if(name.endsWith("*")) {
            this.getFolder(path, 1)
                .removeSources(name => name.startsWith(name.slice(0, -1)), includesFolders);
        } else {
            this.getFolder(path, 1).removeSources((name)=>name === path.getSource(), includesFolders);
        }
    }

    getSources = function (rawRelativePath = "", levelsUp = 0, condition = () => true) {
        const path = this.getPath(rawRelativePath);
        return this.getFolder(path, levelsUp).getSources(condition);
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

    getFileContent = function (rawRelativePath) {
        const path = this.getPath(rawRelativePath);
        const fileName = path.getSource();
        let content = '';
        if(fileName === "*") {
            this.getFolder(path, 1).getFiles().forEach(file => content += file.getContent());
        } else if(fileName.endsWith("*")) {
            this.getFolder(path, 1).getFiles(file => file.startsWith(fileName.slice(0, -1)))
                .forEach(file => content += file.getContent());
        } else {
            content += this.getFolder(path, 1).getFile(fileName).getContent();
        }
        return content;
    }

    setFileContent = function (rawRelativePath, content) {
        const path = this.getPath(rawRelativePath);
        const fileName = path.getSource();
        if(fileName === "*") {
            this.getFolder(path, 1).getFiles().forEach(file => file.setContent(content));
        } else if(fileName.endsWith("*")) {
            this.getFolder(path, 1).getFiles(file => file.startsWith(fileName.slice(0, -1)))
                .forEach(file => file.setContent(content));
        } else {
            this.getFolder(path, 1).getFile(fileName).setContent(content);
        }
    }

    appendFileContent = function (rawRelativePath, content) {
        const path = this.getPath(rawRelativePath);
        const fileName = path.getSource();
        if(fileName === "*") {
            this.getFolder(path, 1).getFiles().forEach(file => file.appendContent(content));
        } else if(fileName.endsWith("*")) {
            this.getFolder(path, 1).getFiles(file => file.startsWith(fileName.slice(0, -1)))
                .forEach(file => file.appendContent(content));
        } else {
            this.getFolder(path, 1).getFile(fileName).appendContent(content);
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