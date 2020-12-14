import {manFile} from './model/manFile.js';

export const manCat = new manFile(

        (`
        <div  class = 'h2Item'>
            <h2>Name</h2>
        <p>cat - concatenate files and print on the standard output </p>
        </div>
        `),
        
        (`
        <div  class = 'h2Item'>
        <h2>Synopsis</h2>
        <b>cat</b> [<i>OPTION</i>]... [<i>FILE</i>]...
        </div>
        `),

        (`
        <div  class = 'h2Item'>
        <h2>Description</h2>
        <p>Concatenate <b>FILE</b>(s), or standard input, to standard output.
        <dt><b>--help</b>
        <dd>display this help and exit
        <dt><b>></b>
        <dd>replaces the content of the file</dl>
        <dt><b>>></b>
        <dd>adds to the content that the new content is already in the file</dl>
        </div>
        `),

        (`
        <div  class = 'h2Item'>
        <h2>Examples</h2>
        <dl compact>
        <dt>cat f g
        <dd>Output f's contents, then standard input, then g's contents.
        <dt>cat
        <dd>Copy standard input to standard output.</dl>
        <dt>cat > [FILE]
        <dd>replaces the content of the file</dl>
        <dt>cat >> [FILE]
        <dd>adds to the content that the new content is already in the file</dl>
        `),

        (`
        <div  class = 'h2Item'>
        <h2>Author</h2>
        <p>Written by Torbjorn Granlund and Richard M. Stallman.</p>
        </div>
        `)
        
    );

//module.exports = { manCat };