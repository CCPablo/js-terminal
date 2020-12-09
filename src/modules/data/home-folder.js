import {Folder} from '../model/folder.js'
import {File} from '../model/file.js'
import {getFolder, enterFolder, exitFolder, getPath} from '../state/folders.js'

const test = new File('Test', '1')
const home = new Folder('Home', '')