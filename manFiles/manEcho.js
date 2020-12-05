import manClass from './classForMan';

let manEcho = new manClass(

        (`
        <h2>Name</h2>
        <p>echo - display a line of text</p>
        `),

        (`
        <h2>Synopsis</h2>
        <b>echo</b> [<i>SHORT-OPTION</i>]... [<i>STRING</i>]...<br>
        <b>echo</b> <i>LONG-OPTION</i>
        `),

        (`
        <h2>Description</h2>
        <p>Echo the <b>STRING</b>(s) to standard output.
        <dl compact>
        <dt><b>-n</b>
        <dd>do not output the trailing newline
        <dt><b>-e</b>
        <dd>enable interpretation of backslash escapes
        <dt><b>-E</b>
        <dd>disable interpretation of backslash escapes (default)
        <dt><b>--help</b>
        <dd>display this help and exit
        <dt><b>--version</b>
        <dd>output version information and exit</dl>
        <p>If <b>-e</b> is in effect, the following sequences are recognized:
        <dl compact>
        <dt>\\
        <dd>backslash
        <dt>\a
        <dd>alert (BEL)
        <dt>\b
        <dd>backspace
        <dt>\c
        <dd>produce no further output
        <dt>\e
        <dd>escape
        <dt>\f
        <dd>form feed
        <dt>\n
        <dd>new line
        <dt>\r
        <dd>carriage return
        <dt>\t
        <dd>horizontal tab
        <dt>\v
        <dd>vertical tab
        <dt>\0NNN
        <dd>byte with octal value NNN (1 to 3 digits)
        <dt>xHH'
        <dd>byte with hexadecimal value HH (1 to 2 digits)</dl>
        <p>NOTE: your shell may have its own version of echo, which usually supersedes the version described here. Please refer to your shell's documentation for
        details about the options it supports. </p>
        `),

        (
        `<h2>No examples available</h2>`
        ),

        (`
        <h2>Author</h2>
        <p>Written by Brian Fox and Chet Ramey.</p>
        `)

    );

module.exports = { manEcho };