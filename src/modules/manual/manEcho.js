import {manFile} from './model/manFile.js';

export const manEcho = new manFile(

        (`
        <div  class = 'h2Item'>
        <h2>Name</h2>
        <p>echo - display a line of text</p>
        </div>
        `),

        (`
        <div  class = 'h2Item'>
        <h2>Synopsis</h2>
        <b>echo</b> [<i>SHORT-OPTION</i>]... [<i>STRING</i>]...<br>
        <b>echo</b> <i>LONG-OPTION</i>
        </div>
        `),

        (`
        <div  class = 'h2Item'>
        <h2>Description</h2>
        <p>Echo the <b>STRING</b>(s) to standard output.
        <dl compact>
        <dt><b>--help</b>
        <dd>display this help and exit

        <p>NOTE: your shell may have its own version of echo, which usually supersedes the version described here. Please refer to your shell's documentation for
        details about the options it supports. </p>
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
        <p>Written by Brian Fox and Chet Ramey.</p>
        </div>
        `)

    );

//module.exports = { manEcho };