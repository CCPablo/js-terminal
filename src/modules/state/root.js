
import {Folder} from '../model/folder.js'
import {File} from '../model/file.js'
import {Directory} from '../model/directory.js'
import { Path } from '../model/path.js';

let rootDirectory = new Directory();

document.addEventListener("DOMContentLoaded", () => {
    const savedRootFolder = JSON.parse(localStorage.getItem('root'));
    if(savedRootFolder) {
        //rootFolder = constructFolder(savedRootFolder);
    }
});

setTimeout(() => {
    console.log('root folder', JSON.parse(JSON.stringify(rootDirectory.rootFolder)));
    console.log(`root size: ${rootDirectory.rootFolder.getSize()/1000} kb`)
}, 300)

function createFolder(relativePath = "") {
    return rootDirectory.createFolder(relativePath);
}

function getFileContent(relativePath) {
    return rootDirectory.getFileContent(relativePath);
}

function createFile(relativePath = "") {
    return rootDirectory.createFile(relativePath);
}

function removeSources(relativePath = "", includesFolders) {
    rootDirectory.removeSources(relativePath, includesFolders);
}

function getSourceNames(relativePath = "", recursive = false, detailed = false, sortedByCreation = false) {
    return rootDirectory.getSourceNames(relativePath);
}

function changePath(relativePath = "") {
    rootDirectory.enterFolder(relativePath)
}

function getPath() {
    return rootDirectory.getRawPath();
}

function autocomplete(relativePath = "") {
    let path = new Path();
    path = path.appendRelative(relativePath, true);
    
    let equivalences = rootDirectory.getSources(relativePath, !path.getSource() ? 0 : 1, (name) => name.startsWith(path.getSource()));
    console.log(equivalences)
    if(equivalences.length === 0) {
        return '';
    } else if (equivalences.length === 1) {
        return equivalences[0].name.slice(path.getSource().length) + endChar(equivalences[0].type);
    } else {
        return getWordBeforeConflict(path.getSource().length).slice(path.getSource().length)
    }

    function endChar(type) {
        return type === 'folder' ? '/' : '&nbsp;'
    }

    function getWordBeforeConflict(initialIndex) {
        equivalences.sort((a, b) => b.name.length - a.name.length);
        const maxWord = equivalences[0].name;
        let result = false;

        for(let i = initialIndex; i <= maxWord.length; i++) {
            result = checkOdd(maxWord.slice(0, i));
            if(result) {
                break;
            }
        }
        return result;
    }

    function checkOdd(word) {
        for(let i = 0; i < equivalences.length; i++) {
            if(!equivalences[i].name.startsWith(word)) {
                return word.slice(0, -1);
            }
        }
        return false;
    }
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
    changePath,
    createFolder,
    removeSources,
    getFileContent,
    getPath,
    getSourceNames,
    autocomplete}

