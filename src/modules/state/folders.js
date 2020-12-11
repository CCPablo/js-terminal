
import {Folder} from '../model/folder.js'
import {File} from '../model/file.js'

let rootFolder = new Folder();

let absolutPath = [];

function getFolder(relativePath = "") {
    const relativePathPointer = getRelativePathPointer(relativePath);
    return extractFolder(relativePathPointer);
}

function addFolder(name, relativePath = "") {
    getFolder(relativePath).addFolder(name);
}

function extractFolder(relativePathPointer) {
    return absolutPath.slice(0, absolutPath.length - relativePathPointer.levelsUp)
                        .concat(relativePathPointer.foldersDown)
                        .reduce((parentFolder, folderName) => parentFolder.getFolder(folderName), rootFolder);
}

function getSources(relativePath = "") {
    return getFolder(relativePath).getSources();
}

function enterFolder(relativePath) {
    const relativePathPointer = getRelativePathPointer(relativePath);
    try {
        extractFolder(relativePathPointer);
    } catch(err) {
        throw err;
    }
    exitFolder(relativePathPointer.levelsUp);
    enterPath(relativePathPointer.foldersDown);
}

function exitFolder(levelsUp = 1) {
    absolutPath.splice(-levelsUp, levelsUp);
}

function enterPath(foldersDown) {
    absolutPath = absolutPath.concat(foldersDown);
}

function getAbsolutPath() {
    return `/${absolutPath.join('/')}`;
}

function getRelativePathPointer(relativePath) {
    if(!relativePath) {
        return {
            foldersDown: [],
            levelsUp: 0
        }
    }
    let folders = relativePath.split('/').filter((folder) => folder !== "");
    if(relativePath.startsWith('/')) {
        return {
            foldersDown: folders,
            levelsUp: 1000
        }
    } else {
        let levelsUp = 0;
        folders = folders.filter(folder => {
            if(folder === ".") {
                return false;
            }
            else if(folder === "..") {
                levelsUp++;
                return false;
            }
            return true;
        });
        return {
            foldersDown: folders,
            levelsUp: levelsUp
        };
    }
}

function autocomplete(parentPath, letters) {
    let equivalences = getSources(parentPath).filter(source => source.startsWith(letters));

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

setTimeout(() => {
    localStorage.setItem('root', JSON.stringify(rootFolder));
    let saved = localStorage.getItem('root');
    console.log(`saved string of ${saved.length} characters`)
    const savedObject = JSON.parse(saved);
    const rootFromLS = constructFolder(savedObject);
    console.log(`folder from local Storage (without functions):`, JSON.parse(JSON.stringify(rootFolder)));
    console.log(rootFromLS)
    analysis(rootFromLS)
}, 300);

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

    const mappedWithNoFiles = rootFromLS.map((folder, folderName, folderPath) => {
        return new Folder(folder.files, folder.folders);
    })

    console.log(`map execution done in ${performance.now()-startTime} ms`)

    startTime = performance.now();

    const filterFoldersWithLessThan25Files = rootFromLS.filter((folder, folderName, folderPath) => {
        return folder.getFiles().length < 25;
    })

    console.log(`filter execution done in ${performance.now()-startTime} ms`)

    console.log(`mapped (with no files):`, mappedWithNoFiles);
    console.log(`filtered (with less than 25 files):`, filterFoldersWithLessThan25Files);

}

function constructFolder(folder) {
    for(let fold in folder.folders) {
        folder.folders[fold] = constructFolder(folder.folders[fold]);
    }
    for(let fil in folder.files) {
        folder.files[fil] = createFile(folder.files[fil])
    }
    return new Folder(folder.files, folder.folders);
}

function createFile(file) {
    return new File(file.name, file.content);
}

////

for(let g = 0; g<5; g++) {
    getFolder().addFolder(`folder${g}`)
    enterFolder(`folder${g}`);
    for(let j = 0; j<5; j++) {
        getFolder().addFile(`file${g}${String.fromCharCode(j + 97)}.js`);
        getFolder().getFile(`file${g}${String.fromCharCode(j + 97)}.js`).setContent(Array(201).join('x'))
    }
    for(let i = 0; i<5; i++) {
        getFolder().addFolder(`folder${g}-${i}`)
        enterFolder(`folder${g}-${i}`);
        for(let j = 0; j<20; j++) {
            getFolder().addFile(`file${g}-${i}${String.fromCharCode(j + 97)}.js`);
            getFolder().getFile(`file${g}-${i}${String.fromCharCode(j + 97)}.js`).setContent(Array(201).join('x'))
        }
        for(let k = 0; k<20; k++) {
            getFolder().addFolder(`folder${g}-${i}-${k}`)
            enterFolder(`folder${g}-${i}-${k}`);
            for(let j = 0; j<30; j++) {
                getFolder().addFile(`file${g}-${i}-${k}${String.fromCharCode(j + 97)}.js`);
                getFolder().getFile(`file${g}-${i}-${k}${String.fromCharCode(j + 97)}.js`).setContent(Array(201).join('x'))
            }
            exitFolder();
        }
        exitFolder();
    }
    exitFolder();
}

enterFolder('/');

export {getFolder, 
    enterFolder, 
    exitFolder, 
    getAbsolutPath, 
    getSources,
    autocomplete}

