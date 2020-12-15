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
<<<<<<< HEAD
    <dt><b>-a</b>
    <dd>change only the access time
    <dt><b>-c, --no-create</b>
    <dd>do not create any files
    <dt><b>-d, --date=,STRING/</b>
    <dd>parse STRING and use it instead of current time
    <dt><b>-f</i>
    <dd>(ignored)
    <dt><b>-h, --no-dereference</b>
    <dd>affect each symbolic link instead of any referenced file (useful only on systems that can change the timestamps of a symlink)
    <dt><b>-m</b>
    <dd>change only the modification time
    <dt><b>-r, --reference=,FILE/</b>
    <dd>do not remove '/' (default)
    <dt><b>-t STAMP</b>
    <dd>use [[CC]YY]MMDDhhmm[.ss] instead of current time
    <dt><b>--time=,WORD/</b>
    <dd>change the specified time: WORD is access, atime, or use: equivalent to <b>-a</b> WORD is modify or mtime: equivalent to <b>-m</b>
    <dt><b>--help</b>
    <dd>display this help and exit
    <dt><b>--version</b>
    <dd>output version information and exit</dl>
    <p>Note that the <b>-d</b> and <b>-t</b> options accept different time-date formats.</p>
=======
    <dt><b>--help</b>
    <dd>display this help and exit
>>>>>>> 5ef5505d4223c9d027f1b49261f77b71ad34d166
    </div>
    `),

    (`
    <div  class = 'h2Item'>
    <h2>Author</h2>
    <p>Written by Paul Rubin, Arnold Robbins, Jim Kingdon, David MacKenzie, and Randy Smith.</p>
    </div>
    `)

    );

