
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
    let folders = relativePath.split('/');
    if(relativePath.startsWith('/')) {
        folders.shift();
        return {
            foldersDown: folders,
            levelsUp: 100
        }
    } else {
        let levelsUp = 0;
        folders = folders.filter(folder => {
            if(folder === "." || folder === "") {
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

////

logState();
logAction('add 3 files to root folder')

getFolder().addFolder('1')
getFolder().addFolder('2')
getFolder().addFolder('3')
getFolder().addFile('file1.js')
getFolder().addFile('file2.js')
getFolder().addFile('file3.js')

logState();
logAction('add folder new folder and set active')

getFolder().addFolder('new folder')
enterFolder('new folder')

logState();
logAction('add file inside folder')

getFolder().addFile('file4.js')

logState();

logAction('display relative level -1')

logState();

function logState() {
    console.log('\n')
    console.log(getFolder());
    console.log(getAbsolutPath())
    console.log('\n')
}

function logAction(action) {
    console.log('--> ' + action);
}




export {getFolder, enterFolder, exitFolder, getAbsolutPath, getSources}

