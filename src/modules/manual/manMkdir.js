import {manFile} from './model/manFile.js';

export const manMkdir = new manFile(


        (`
        <div  class = 'h2Item'>
        <h2>Name</h2>
        <p>mkdir - make directories</p>
        </div>
        `),

        (`
        <div  class = 'h2Item'>
        <h2>Synopsis</h2>
        <b>mkdir</b> [<i>OPTION</i>]... <i>DIRECTORY</i>...
        </div>
        `),

        (`
        <div  class = 'h2Item'>
        <h2>Description</h2>
        <p>Create the DIRECTORY(ies), if they do not already exist.
        <p>Mandatory arguments to long options are mandatory for short options too.
        <dl compact>
        <dt><b>--help</b>
        <dd>display this help and exit
        <h2>Description</h2>
        <b>mkdir</b>() attempts to create a directory named <i>pathname</i>.
        <p>The argument <i>mode</i> specifies the permissions to use. It is modified by the process's <i>umask</i> in the usual way: the permissions of the created
        directory are (<i>mode</i> &amp; ~<i>umask</i> &amp; 0777). Other mode bits of the created directory depend on the operating system. For Linux, see below.
        <p>The newly created directory will be owned by the effective user ID of the process. If the directory containing the file has the set-group-ID bit set, or if
        the file system is mounted with BSD group semantics (<i>mount -o bsdgroups</i> or, synonymously <i>mount -o grpid</i>), the new directory will inherit the
        group ownership from its parent; otherwise it will be owned by the effective group ID of the process.
        <p>If the parent directory has the set-group-ID bit set then so will the newly created directory.
        </div>
        `),
        
        (`
        <div  class = 'h2Item'>
        <h2>Return Value</h2>
        <b>mkdir</b>() returns zero on success, or -1 if an error occurred (in which case,
        <i>errno</i> is set appropriately).
        </div>
        `),
        
        (`
        <div  class = 'h2Item'>
        <h2>Author</h2>
        Written by David MacKenzie.
        </div>
        `)
    
    );

//module.exports = { manMkdir };