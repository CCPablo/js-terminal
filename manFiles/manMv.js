import manClass from './classForMan';

let manMv = new manClass(

        (
        `<h2>Name</h2>
        mv - move (rename) files
        `),

        (`
        <h2>Synopsis</h2>
        <b>mv</b> [<i>OPTION</i>]... [<i>-T</i>] <i>SOURCE DEST</i><br>
        <b>mv</b> [<i>OPTION</i>]... <i>SOURCE</i>... <i>DIRECTORY</i><br>
        <b>mv</b> [<i>OPTION</i>]... <i>-t DIRECTORY SOURCE</i>...
        `),

        (`
        <h2>Description</h2>
        <p>Rename SOURCE to DEST, or move <b>SOURCE</b>(s) to DIRECTORY.
        <p>Mandatory arguments to long options are mandatory for short options too.
        <dl compact>
        <dt><b>--backup</b>[=<i>CONTROL</i>]
        <dd>make a backup of each existing destination file
        <dt><b>-b</b>
        <dd>like <b>--backup</b> but does not accept an argument
        <dt><b>-f</b>, <b>--force</b>
        <dd>do not prompt before overwriting
        <dt><b>-i</b>, <b>--interactive</b>
        <dd>prompt before overwrite
        <dt><b>-n</b>, <b>--no-clobber</b>
        <dd>do not overwrite an existing file</dl>
        <p>If you specify more than one of <b>-i</b>, <b>-f</b>, <b>-n</b>, only the final one takes effect.
        <dl compact>
        <dt><b>--strip-trailing-slashes</b>
        <dd>remove any trailing slashes from each SOURCE argument
        <dt><b>-S</b>, <b>--suffix</b>=<i>SUFFIX</i>
        <dd>override the usual backup suffix
        <dt><b>-t</b>, <b>--target-directory</b>=<i>DIRECTORY</i>
        <dd>move all SOURCE arguments into DIRECTORY
        <dt><b>-T</b>, <b>--no-target-directory</b>
        <dd>treat DEST as a normal file
        <dt><b>-u</b>, <b>--update</b>
        <dd>move only when the SOURCE file is newer than the destination file or when the destination file is missing
        <dt><b>-v</b>, <b>--verbose</b>
        <dd>explain what is being done
        <dt><b>--help</b>
        <dd>display this help and exit
        <dt><b>--version</b>
        <dd>output version information and exit</dl>
        <p>The backup suffix is '~', unless set with <b>--suffix</b> or SIMPLE_BACKUP_SUFFIX. The version control method may be selected via the <b>--backup</b> option
        or through the VERSION_CONTROL environment variable. Here are the values:</p>
        <dl compact>
        <dt>none, off
        <dd>never make backups (even if <b>--backup</b> is given)
        <dt>numbered, t
        <dd>make numbered backups
        <dt>existing, nil
        <dd>numbered if numbered backups exist, simple otherwise
        <dt>simple, never
        <dd>always make simple backups</dl>
        `),
        
        (`
            <h2>No examples available</h2>
        `),

        (`
        <h2>Author</h2>
        <p>Written by Mike Parker, David MacKenzie, and Jim Meyering.</p>
        `),
        
        );

module.exports = { manMv };