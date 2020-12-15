import {manFile} from './model/manFile.js';


export const manRm = new manFile (
        (`
        <div  class = 'h2Item'>
        <h2>Name</h2>
        rm - remove files or direcgittories
        </div>
        `),

        (`
        <div  class = 'h2Item'>
        <h2>Synopsis</h2>
        <b>rm</b> [<i>OPTION</i>]... <i>FILE</i>...
        </div>
        `),

        (`
        <div  class = 'h2Item'>
        <h2>Description</h2>
        <p>This manual page documents the GNU version of <b>rm</b>. <b>rm</b> removes each specified file.
        By default, it does not remove directories.</p>
        </div>
        `),

        (`
        <div  class = 'h2Item'>
        <h2>Options</h2>
        <p>Remove (unlink) the <b>FILE</b>(s).
        <dt><b>-r</b>
        <dd>remove directories and their contents recursively
        <dt><b>--help</b>
        <dd>display this help and exit
        <p>Note that if you use rm to remove a file, it is usually possible to recover the contents of that file. If you want more assurance that the contents are
        truly unrecoverable, consider using shred.</p>
        </div>
        `),

        (`
        <div  class = 'h2Item'>
        <h2>Author</h2>
        <p>Written by Paul Rubin, David MacKenzie, Richard M. Stallman, and Jim Meyering.</p>
        </div>
        `)
        
        );


//module.exports = { manRm };



