import {manFile} from './model/manFile.js';

export const manTouch = new manFile(

    (`
    <div  class = 'h2Item'>
    <h2>Name</h2>
    touch - change file timestamps
    </div>
    `),

    (`
    <div  class = 'h2Item'>
    <h2>Synopsis</h2>
    <b>toouch</b> [<i>OPTION</i>]... <i>FILE</i>...
    </div>
    `),

    (`
    <div  class = 'h2Item'>
    <h2>Description</h2>
    <p>Update the access and modification times of each FILE to the current time.
    By default, it does not remove directories.</p>
    <p>A FILE argument that does not exist is created empty, unless <i>-c</i> or <i>-h</i>
    <p>A FILE argument string of - is handled specially and causes touch to change the times of the file associated with standard output.</p>
    <p>Mandatory arguments to long options are mandatory for short options too.</p>
    </div>
    `),

    (`
    <div  class = 'h2Item'>
    <h2>Options</h2>
    <dt><b>--help</b>
    <dd>display this help and exit
    </div>
    `),

    (`
    <div  class = 'h2Item'>
    <h2>Author</h2>
    <p>Written by Paul Rubin, Arnold Robbins, Jim Kingdon, David MacKenzie, and Randy Smith.</p>
    </div>
    `)

);

