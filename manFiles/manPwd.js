let manPwd = `<h2>Synopsis</h2>
        <b>pwd</b> [<i>OPTION</i>]...
        <h2>Description</h2>
        <p>Print the full filename of the current working directory.
        <dl compact>
        <dt><b>-L</b>, <b>--logical</b>
        <dd>use PWD from environment, even if it contains symlinks
        <dt><b>-P</b>, <b>--physical</b>
        <dd>avoid all symlinks
        <dt><b>--help</b>
        <dd>display this help and exit
        <dt><b>--version</b>
        <dd>output version information and exit</dl>
        <p>NOTE: your shell may have its own version of pwd, which usually supersedes the version described here. Please refer to your shell's documentation for
        details about the options it supports.</p>
        <h2>Author</h2>
        <p>Written by Jim Meyering.</p>`;

module.exports = { manPwd };