import {manFile} from './model/manFile.js';

export const manMv = new manFile(

        (`
        <div  class = 'h2Item'>
        <h2>Name</h2>
        mv - move (rename) files
        </div>
        `),

        (`
        <div  class = 'h2Item'>
        <h2>Synopsis</h2>
        <b>mv</b> [<i>OPTION</i>]... [<i>-T</i>] <i>SOURCE DEST</i><br>
        <b>mv</b> [<i>OPTION</i>]... <i>SOURCE</i>... <i>DIRECTORY</i><br>
        <b>mv</b> [<i>OPTION</i>]... <i>-t DIRECTORY SOURCE</i>...
        </div>
        `),

        (`
        <div  class = 'h2Item'>
        <h2>Description</h2>
        <p>Rename SOURCE to DEST, or move <b>SOURCE</b>(s) to DIRECTORY.
        <p>Mandatory arguments to long options are mandatory for short options too.
        </div>
        `),

        (`
        <div  class = 'h2Item'>
            <h2>No examples available</h2>
        </div>
        `),

        (`
        <div  class = 'h2Item'>
        <h2>Author</h2>
        <p>Written by Mike Parker, David MacKenzie, and Jim Meyering.</p>
        </div>
        `),

        );
