/*
let rootFolder = {
    path: [],
    shortcut: 'root',
    folders: [
        {
            path: ['folder1'],
            folders: [
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
            ],
            files: [
                {
                    name: 'file1.js',
                    content: 'Contenido del fichero 1'
                }
            ]
        },
        {
            path: ['folder2'],
            shortcut: 'f2',
            folders: [
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
            ],
            files: [
                {
                    name: 'file1.js',
                    content: 'Contenido del fichero 1'
                }
            ]
        }
    ],
    files: [
        {
            name: 'file2.js',
            content: 'Contenido del fichero 2'
        }
    ]
}
*/

import { Folder } from '../model/folder.js'

export { getActiveFolder, getPath, setActiveFolder }

let rootFolder = new Folder([], [], [], 'root');

let activeFolder = {...rootFolder};

function getActiveFolder() {
    return activeFolder;
}

function setActiveFolder(name) {
    activeFolder = activeFolder.folders.find(folder => folder.getName() === name);
}

function getPath() {
    return activeFolder.getFullPath();
}