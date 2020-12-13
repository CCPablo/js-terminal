
import {Folder} from '../model/folder.js'
import {File} from '../model/file.js'
import {Directory} from '../model/directory.js'

let rootDirectory = new Directory();

function rootInitialLoad(folder) {
    rootDirectory.load(constructFolder(folder));
}

function createFolder(relativePath = "") {
    return rootDirectory.createFolder(relativePath);
}

function getFileContent(relativePath) {
    return rootDirectory.getFileContent(relativePath);
}

function setFileContent(relativePath, content) {
    return rootDirectory.setFileContent(relativePath, content);
}

function appendFileContent(relativePath, content) {
    return rootDirectory.appendFileContent(relativePath, content);
}

function createFile(relativePath = "") {
    return rootDirectory.createFile(relativePath);
}

function removeSources(relativePath = "", includesFolders) {
    rootDirectory.removeSources(relativePath, includesFolders);
}

function getSources(relativePath = "", levelsUp = 0, condition = () => true) {
    return rootDirectory.getSources(relativePath, levelsUp, condition);
}

function changePath(relativePath = "") {
    rootDirectory.enterFolder(relativePath)
}

function getPath() {
    return rootDirectory.getRawPath();
}

function constructFolder(folder) {
    for(let fold in folder.folders) {
        folder.folders[fold] = constructFolder(folder.folders[fold]);
    }
    for(let fil in folder.files) {
        folder.files[fil] = createFile(folder.files[fil])
    }
    return new Folder(folder.files, folder.folders);

    function createFile(file) {
        return new File(file.name, file.content);
    }
}

createFile('root.js')
for(let g = 0; g<5; g++) {
    createFolder(`folder${g}`)
    changePath(`folder${g}`);
    for(let j = 0; j<5; j++) {
        createFile(`file${g}${String.fromCharCode(j + 97)}.js`).setContent(`file${g}${String.fromCharCode(j + 97)}.js`)
    }
    for(let i = 0; i<5; i++) {
        createFolder(`folder${g}-${i}`)
        changePath(`folder${g}-${i}`);
        for(let j = 0; j<20; j++) {
            createFile(`file${g}-${i}${String.fromCharCode(j + 97)}.js`).setContent(`file${g}-${i}${String.fromCharCode(j + 97)}.js`)
        }
        for(let k = 0; k<20; k++) {
            createFolder(`folder${g}-${i}-${k}`)
            changePath(`folder${g}-${i}-${k}`);
            for(let j = 0; j<30; j++) {
                createFile(`file${g}-${i}-${k}${String.fromCharCode(j + 97)}.js`).setContent(Array(201).join(`file${g}-${i}-${k}${String.fromCharCode(j + 97)}.js`))
            }
            changePath("..");
        }
        changePath("..");
    }
    changePath("..");
}
changePath('/');

export {
    rootInitialLoad,
    changePath,
    createFolder,
    removeSources,
    getFileContent,
    setFileContent,
    appendFileContent,
    getPath,
    getSources }

