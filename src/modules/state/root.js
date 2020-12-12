
import {Folder} from '../model/folder.js'
import {File} from '../model/file.js'
import {Directory} from '../model/directory.js'

let rootDirectory = new Directory();

document.addEventListener("DOMContentLoaded", () => {
    const savedRootFolder = JSON.parse(localStorage.getItem('root'));
    if(savedRootFolder) {
        //rootFolder = constructFolder(savedRootFolder);
    }
});

setTimeout(() => {
    analysis(rootDirectory.getFolder());
    console.log('root folder', JSON.parse(JSON.stringify(rootDirectory.rootFolder)));
}, 300)

function createFolder(relativePath = "") {
    return rootDirectory.createFolder(relativePath);
}

function createFile(relativePath = "") {
    return rootDirectory.createFile(relativePath);
}

function removeFolder(relativePath = "") {
    rootDirectory.removeFolder(relativePath);
}

function removeFile(relativePath = "") {
    rootDirectory.removeFile(relativePath);
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

function autocomplete(parentPath, letters) {
    let equivalences = getSourceNames(parentPath).filter(source => source.startsWith(letters));

    if(equivalences.length === 0) {
        return '';
    } else if(equivalences.length === 1) {
        return equivalences[0].slice(letters.length);
    } else {
        return getWordBeforeConflict(equivalences, letters).slice(letters.length);
    }

    function getWordBeforeConflict(arrayOfWords, initalLetters) {
        arrayOfWords.sort((a, b) => b.length - a.length);
        const maxWord = equivalences[0];
        let result = false;

        for(let i = initalLetters.length; i <= maxWord.length; i++) {
            result = checkOdd(equivalences, maxWord.slice(0, i));
            if(result) {
                break;
            }
        }
        return result;
    }

    function checkOdd(arrayOfWords, word) {
        for(let i = 0; i < arrayOfWords.length; i++) {
            if(!arrayOfWords[i].startsWith(word)) {
                return word.slice(0, -1);
            }
        }
        return false;
    }
}

function analysis(rootFromLS) {
    let startTime = performance.now();

    let totalSizeOfFiles = 0;
    let totalFolders = 0;
    let totalFiles = 0;
    rootFromLS.forEach((folder, folderName, folderPath) => {
        totalSizeOfFiles += folder.getFiles().map(file => file.content.length).reduce((prev, acc) => prev+acc, 0);
        totalFolders++;
        totalFiles += folder.getFiles().length;
    })

    console.log(`total folders: ${totalFolders}`)
    console.log(`total files: ${totalFiles}`)
    console.log(`total size of files in path: ${totalSizeOfFiles/1000} kbs`)
    
    console.log(`forEach execution done in ${performance.now()-startTime} ms`)

    startTime = performance.now();

    const mappedWithEmptyFiles = rootFromLS.map((folder, folderName, folderPath) => {
        folder.getFiles().forEach(file => {
            file.content = '';
        })
        return folder;
    })

    console.log(`map execution done in ${performance.now()-startTime} ms`)

    startTime = performance.now();

    const filterFoldersWithLessThan25Files = rootFromLS.filter((folder, folderName, folderPath) => {
        return folder.getFiles().length < 25;
    })

    console.log(`filter execution done in ${performance.now()-startTime} ms`)

    startTime = performance.now();

    const numberOfFiles = rootFromLS.reduce((acc, folder) => {
        return acc + folder.getFiles().length;
    }, 0)

    console.log(`reduce execution done in ${performance.now()-startTime} ms`)

    startTime = performance.now();

    const filteredStructure = rootFromLS.filterStructure(folder => {
        return folder.getFiles().length < 25;
    })

    console.log(`filterStructure execution done in ${performance.now()-startTime} ms`)


    console.log(`mapped (with empty files):`, JSON.parse(JSON.stringify(mappedWithEmptyFiles)));
    console.log(`filtered array (with less than 25 files):`, JSON.parse(JSON.stringify(filterFoldersWithLessThan25Files)));
    console.log(`filtered structure (with less than 25 files):`, JSON.parse(JSON.stringify(filteredStructure)));
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
        createFile(`file${g}${String.fromCharCode(j + 97)}.js`).setContent(Array(201).join('x'))
    }
    for(let i = 0; i<5; i++) {
        createFolder(`folder${g}-${i}`)
        changePath(`folder${g}-${i}`);
        for(let j = 0; j<20; j++) {
            createFile(`file${g}-${i}${String.fromCharCode(j + 97)}.js`).setContent(Array(201).join('x'))
        }
        for(let k = 0; k<20; k++) {
            createFolder(`folder${g}-${i}-${k}`)
            changePath(`folder${g}-${i}-${k}`);
            for(let j = 0; j<30; j++) {
                createFile(`file${g}-${i}-${k}${String.fromCharCode(j + 97)}.js`).setContent(Array(201).join('x'))
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
    removeFolder,
    removeFile,
    getPath,
    getSourceNames,
    autocomplete}

