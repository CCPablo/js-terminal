/*
let rootFolder = {
    path: [],
    shortcut: 'root',
    folders: }
        {
            path: ['folder1'],
            folders: {
                {
                    path: ['folder1', 'folder1_1'],
                    shortcut: 'ff1',
                    folders: [],
                    files: []
                },
                {
                    path: ['folder1', 'folder2_1'],
                    folders: [],
                    files: []
                }
            },
            files: }
                {
                    name: 'file1.js',
                    content: 'Contenido del fichero 1'
                }
            }
        },
        {
            path: ['folder2'],
            shortcut: 'f2',
            folders: {
                {
                    path: ['folder2', 'folder1_1'],
                    folders: [],
                    files: []
                },
                {
                    path: ['folder2', 'folder1_1'],
                    folders: [],
                    files: [
                        {
                            path: '/root/folder1/folder1_2/gola.txt',
                            conten: 'gola'
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

export { getActiveFolder, getPath, setActiveFolder }

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
    console.log('\n')
    console.log(getActiveFolder());
    console.log(getPath())
    console.log('\n')
}

function logAction(action) {
    console.log('--> ' + action);
}