import {manFile} from '../../model/manFile';

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
        <dl compact>
        <dt><b>-A</b>, <b>--show-all</b>
        <dd>equivalent to <b>-vET</b>
        <dt><b>-b</b>, <b>--number-nonblank</b>
        <dd>number nonempty output lines
        <dt><b>-e</b>
        <dd>equivalent to <b>-vE</b>
        <dt><b>-E</b>, <b>--show-ends</b>
        <dd>display $ at end of each line
        <dt><b>-n</b>, <b>--number</b>
        <dd>number all output lines
        <dt><b>-s</b>, <b>--squeeze-blank</b>
        <dd>suppress repeated empty output lines
        <dt><b>-t</b>
        <dd>equivalent to <b>-vT</b>
        <dt><b>-T</b>, <b>--show-tabs</b>
        <dd>display TAB characters as ^I
        <dt><b>-u</b>
        <dd>(ignored)
        <dt><b>-v</b>, <b>--show-nonprinting</b>
        <dd>use ^ and M- notation, except for LFD and TAB
        <dt><b>--help</b>
        <dd>display this help and exit
        <dt><b>--version</b>
        <dd>output version information and exit</dl>
        <p>With no FILE, or when FILE is -, read standard input.
        </div>
        `),

        (`
        <div  class = 'h2Item'>
        <h2>Examples</h2>
        <dl compact>
        <dt>cat f - g
        <dd>Output f's contents, then standard input, then g's contents.
        <dt>cat
        <dd>Copy standard input to standard output.</dl>
        `),

        (`
        <div  class = 'h2Item'>
        <h2>Author</h2>
        <p>Written by Torbjorn Granlund and Richard M. Stallman.</p>
        </div>
        `)
        
    );

module.exports = { manCat };