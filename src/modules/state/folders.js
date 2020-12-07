/*
let rootFolder = {
    folders: {
        {
            folders: {
                {
                    folders: [],
                    files: []
                },
                {
                    folders: [],
                    files: []
                }
            },
            files: {
                {
                    name: 'file1.js',
                    content: 'Contenido del fichero 1'
                }
            }
        },
        {
            folders: {
                {
                    folders: [],
                    files: []
                },
                {
                    folders: [],
                    files: [
                        {
                            name: 'file1.txt',
                            content: 'gola'
                        }
                    ]
                }
            },
            files: {
                {
                    name: 'file1.js',
                    content: 'Contenido del fichero 1'
                }
            }
        }
    },
    files: {
        {
            name: 'file2.js',
            content: 'Contenido del fichero 2'
        }
    {
}
*/

import { Folder } from '../model/folder.js'

export { getActiveFolder, enterFolder, exitFolder, getPath }

let rootFolder = new Folder();

let currentPath = [];

function getActiveFolder() {
    return currentPath.reduce((parent, child) =>  parent.folders[child], rootFolder)
}

function enterFolder(name) {
    currentPath.push(name);
}

function exitFolder() {
    currentPath.pop();
}

function getPath() {
    return `/${currentPath.join('/')}`;
}

////

logState();
logAction('add 3 files to root folder')

getActiveFolder().addFile('file1.js')
getActiveFolder().addFile('file2.js')
getActiveFolder().addFile('file3.js')

logState();
logAction('add folder new folder and set active')

getActiveFolder().addFolder('new folder')
enterFolder('new folder')

logState();
logAction('add file inside folder')

getActiveFolder().addFile('file4.js')

logState();

function logState() {
    // console.log('\n')
    // console.log(getActiveFolder());
    // console.log(getPath())
    // console.log('\n')
}

function logAction(action) {
    // console.log('--> ' + action);
}