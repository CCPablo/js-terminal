import {manFile} from './model/manFile.js';

export const manPwd = new manFile(
        (`
        <div  class = 'h2Item'>
        <h2>Name</h2>
        <b>pwd - print name of current/working directory
        </div>
        `),

        (`
        <div  class = 'h2Item'>
        <h2>Synopsis</h2>
        <b>pwd</b> [<i>OPTION</i>]...
        </div>
        `),

        (`
        <div  class = 'h2Item'>
        <h2>Description</h2>
        <p>Print the full filename of the current working directory.
        <dl compact>
        <dt><b>--help</b>
        <dd>display this help and exit
        <p>NOTE: your shell may have its own version of pwd, which usually supersedes the version described here. Please refer to your shell's documentation for
        details about the options it supports.</p>
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
        <p>Written by Jim Meyering.</p>
        </div>
        `)
    );

//module.exports = { manPwd };