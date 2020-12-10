
import {Folder} from '../model/folder.js'

let rootFolder = new Folder();

let absolutPath = [];

/*
    - returns the relative folder based on current path
    - throws error if folder does not exist
*/

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
        //checks if folder exist
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
            levelsUp: 100
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
    let savedObject = JSON.parse(saved);
    console.log(savedObject);
    generateRoot(savedObject);
}, 100);

function generateRoot(savedObject) {
    const rootFromLS = createFolder(savedObject);
    console.log(`folder from local Storage:`, rootFromLS)

    rootFromLS.forEach((folder, folderName, folderPath) => {
        console.log(`folder named '${folderName ? folderName : 'root'}' in path '${folderPath}' with files '${folder.getFileNames()}'`);
    })

    const mapped = rootFromLS.map((folder, folderName, folderPath) => {
        return new Folder({}, folder.folders);
    })

    console.log(`original mapped (with files):`, rootFromLS)
    console.log(`folder mapped (with no files):`, mapped);
}

function createFolder(folder) {
    for(let fold in folder.folders) {
        folder.folders[fold] = createFolder(folder.folders[fold]);
    }
    return new Folder({...folder.files}, {...folder.folders});
}

////

getFolder().addFile('rootFile.js')
addFolder('f1')
addFolder('f2')
addFolder('f3')
getFolder('f1').addFile('file1.js')
getFolder('f2').addFile('file2.js')
getFolder('f3').addFile('file3.js')
addFolder('f4')
getFolder('f4').addFile('file4.js')
getFolder('f4').addFolder('f5');
getFolder('f4/f5').addFile('file5.js')

export {getFolder, 
    enterFolder, 
    exitFolder, 
    getAbsolutPath, 
    getSources,
    autocomplete}

