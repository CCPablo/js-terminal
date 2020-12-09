import manFile from './manFile';


const manRm = new manFile (
        (`
        <div  class = 'h2Item'>
        <h2>Name</h2>
        rm - remove files or directories
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
        <p>If the <i>-I</i> or <i>--interactive=once</i> option is given, and there are more than three files or the <i>-r</i>, <i>-R</i>, or <i>--recursive</i> are
        given, then <b>rm</b> prompts the user for whether to proceed with the entire operation. If the response is not affirmative, the entire command is aborted.
        <p>Otherwise, if a file is unwritable, standard input is a terminal, and the <i>-f</i> or <i>--force</i> option is not given, or the <i>-i</i> or
        <i>--interactive=always</i> option is given, <b>rm</b> prompts the user for whether to remove the file. If the response is not affirmative, the file is
        skipped.</p>
        </div>
        `),

        (`
        <div  class = 'h2Item'>
        <h2>Options</h2>
        <p>Remove (unlink) the <b>FILE</b>(s).
        <dl compact>
        <dt><b>-f</b>, <b>--force</b>
        <dd>ignore nonexistent files, never prompt
        <dt><b>-i</b>
        <dd>prompt before every removal
        <dt><b>-I</b>
        <dd>prompt once before removing more than three files, or when removing recursively. Less intrusive than <b>-i</b>, while still giving protection against most
        mistakes
        <dt><b>--interactive</b>[=<i>WHEN</i>]
        <dd>prompt according to WHEN: never, once (<b>-I</b>), or always (<b>-i</b>). Without WHEN, prompt always
        <dt><b>--one-file-system</b>
        <dd>when removing a hierarchy recursively, skip any directory that is on a file system different from that of the corresponding command line argument
        <dt><b>--no-preserve-root</b>
        <dd>do not treat '/' specially
        <dt><b>--preserve-root</b>
        <dd>do not remove '/' (default)
        <dt><b>-r</b>, <b>-R</b>, <b>--recursive</b>
        <dd>remove directories and their contents recursively
        <dt><b>-v</b>, <b>--verbose</b>
        <dd>explain what is being done
        <dt><b>--help</b>
        <dd>display this help and exit
        <dt><b>--version</b>
        <dd>output version information and exit</dl>
        <p>By default, rm does not remove directories. Use the <b>--recursive</b> (<b>-r</b> or <b>-R</b>) option to remove each listed directory, too, along with all
        of its contents.
        <p>To remove a file whose name starts with a '-', for example '-foo', use one of these commands:
        <dl compact>
        <dt>rm <b>-- -foo</b>
        <dt>rm ./-foo</dl>
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


        module.exports = { manRm };



