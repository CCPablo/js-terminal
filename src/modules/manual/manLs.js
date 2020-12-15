import {manFile} from './model/manFile.js';

export const manLs = new manFile(

    (`
        <div  class = 'h2Item'>
        <h2>Name</h2>
        <p>ls - list directory contents </p>
        </div>
    `),

    (`
        <div  class = 'h2Item'>
        <h2>Synopsis</h2>
        <b>ls</b> [<i>OPTION</i>]... [<i>FILE</i>]...
        </div>
    `),

    (`
        <div  class = 'h2Item'>
            <h2>Description</h2>
            <p>List information about the FILEs (the current directory by default). Sort entries alphabetically if none of <b>-cftuvSUX</b> nor <b>--sort</b>.
            <p>Mandatory arguments to long options are mandatory for short options too.
            <dl compact>
            <dt><b>-l</b>
            <dd>use a long listing format
            <dt><b>-R</b>, <b>--recursive</b>
            <dd>list subdirectories recursively
            <dt><b>-S</b>
            <dd>sort by file size
            <dt><b>-t</b>
            <dd>sort by modification time
    `),

    (`
        <div  class = 'h2Item'>
        <p>SELinux options:
        <dt><b>--help</b>
        <dd>display this help and exit
    `),

    (`
        <div  class = 'h2Item'>
        <h2>Author</h2>
        <p>Written by Richard M. Stallman and David Ma </p>
        </div>
        `)

);

//module.exports = { manLs };





