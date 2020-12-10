
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
        return getWordBeforeConflict(equivalences, name).slice(letters.length);
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



////

getFolder().addFolder('1')
getFolder().addFolder('2')
getFolder().addFolder('3')
getFolder().addFile('file1.js')
getFolder().addFile('file2.js')
getFolder().addFile('file3.js')

getFolder().addFolder('new-folder')
enterFolder('new-folder')

getFolder().addFile('file4.js')

export {getFolder, 
    enterFolder, 
    exitFolder, 
    getAbsolutPath, 
    getSources,
    autocomplete}

