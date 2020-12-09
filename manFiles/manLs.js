import manFile from './manFile';

const manLs = new manFile(

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
        <dt><b>-a</b>, <b>--all</b>
        <dd>do not ignore entries starting with .
        <dt><b>-A</b>, <b>--almost-all</b>
        <dd>do not list implied . and ..
        <dt><b>--author</b>
        <dd>with <b>-l</b>, print the author of each file
        <dt><b>-b</b>, <b>--escape</b>
        <dd>print octal escapes for nongraphic characters
        <dt><b>--block-size</b>=<i>SIZE</i>
        <dd>use SIZE-byte blocks. See SIZE format below
        <dt><b>-B</b>, <b>--ignore-backups</b>
        <dd>do not list implied entries ending with ~
        <dt><b>-c</b>
        <dd>with <b>-lt</b>: sort by, and show, ctime (time of last modification of file status information) with <b>-l</b>: show ctime and sort by name otherwise:
        sort by ctime
        <dt><b>-C</b>
        <dd>list entries by columns
        <dt><b>--color</b>[=<i>WHEN</i>]
        <dd>colorize the output. WHEN defaults to 'always' or can be 'never' or 'auto'. More info below
        <dt><b>-d</b>, <b>--directory</b>
        <dd>list directory entries instead of contents, and do not dereference symbolic links
        <dt><b>-D</b>, <b>--dired</b>
        <dd>generate output designed for Emacs' dired mode
        <dt><b>-f</b>
        <dd>do not sort, enable <b>-aU</b>, disable <b>-ls --color</b>
        <dt><b>-F</b>, <b>--classify</b>
        <dd>append indicator (one of */=&gt;@|) to entries
        <dt><b>--file-type</b>
        <dd>likewise, except do not append '*'
        <dt><b>--format</b>=<i>WORD</i>
        <dd>across <b>-x</b>, commas <b>-m</b>, horizontal <b>-x</b>, long <b>-l</b>, single-column <b>-1</b>, verbose <b>-l</b>, vertical <b>-C</b>
        <dt><b>--full-time</b>
        <dd>like <b>-l --time-style</b>=<i>full-iso</i>
        <dt><b>-g</b>
        <dd>like <b>-l</b>, but do not list owner
        <dt><b>--group-directories-first</b>
        <dd>group directories before files.
        <dt>augment with a <b>--sort</b> option, but any
        <dd>use of <b>--sort</b>=<i>none</i> (<b>-U</b>) disables grouping
        <dt><b>-G</b>, <b>--no-group</b>
        <dd>in a long listing, don't print group names
        <dt><b>-h</b>, <b>--human-readable</b>
        <dd>with <b>-l</b>, print sizes in human readable format (e.g., 1K 234M 2G)
        <dt><b>--si</b>
        <dd>likewise, but use powers of 1000 not 1024
        <dt><b>-H</b>, <b>--dereference-command-line</b>
        <dd>follow symbolic links listed on the command line
        <dt><b>--dereference-command-line-symlink-to-dir</b>
        <dd>follow each command line symbolic link that points to a directory
        <dt><b>--hide</b>=<i>PATTERN</i>
        <dd>do not list implied entries matching shell PATTERN (overridden by <b>-a</b> or <b>-A</b>)
        <dt><b>--indicator-style</b>=<i>WORD</i>
        <dd>append indicator with style WORD to entry names: none (default), slash (<b>-p</b>), file-type (<b>--file-type</b>), classify (<b>-F</b>)
        <dt><b>-i</b>, <b>--inode</b>
        <dd>print the index number of each file
        <dt><b>-I</b>, <b>--ignore</b>=<i>PATTERN</i>
        <dd>do not list implied entries matching shell PATTERN
        <dt><b>-k</b>
        <dd>like <b>--block-size</b>=<i>1K</i>
        <dt><b>-l</b>
        <dd>use a long listing format
        <dt><b>-L</b>, <b>--dereference</b>
        <dd>when showing file information for a symbolic link, show information for the file the link references rather than for the link itself
        <dt><b>-m</b>
        <dd>fill width with a comma separated list of entries
        <dt><b>-n</b>, <b>--numeric-uid-gid</b>
        <dd>like <b>-l</b>, but list numeric user and group IDs
        <dt><b>-N</b>, <b>--literal</b>
        <dd>print raw entry names (don't treat e.g. control characters specially)
        <dt><b>-o</b>
        <dd>like <b>-l</b>, but do not list group information
        <dt><b>-p</b>, <b>--indicator-style</b>=<i>slash</i>
        <dd>append / indicator to directories
        <dt><b>-q</b>, <b>--hide-control-chars</b>
        <dd>print ? instead of non graphic characters
        <dt><b>--show-control-chars</b>
        <dd>show non graphic characters as-is (default unless program is 'ls' and output is a terminal)
        <dt><b>-Q</b>, <b>--quote-name</b>
        <dd>enclose entry names in double quotes
        <dt><b>--quoting-style</b>=<i>WORD</i>
        <dd>use quoting style WORD for entry names: literal, locale, shell, shell-always, c, escape
        <dt><b>-r</b>, <b>--reverse</b>
        <dd>reverse order while sorting
        <dt><b>-R</b>, <b>--recursive</b>
        <dd>list subdirectories recursively
        <dt><b>-s</b>, <b>--size</b>
        <dd>print the allocated size of each file, in blocks
        <dt><b>-S</b>
        <dd>sort by file size
        <dt><b>--sort</b>=<i>WORD</i>
        <dd>sort by WORD instead of name: none <b>-U</b>, extension <b>-X</b>, size <b>-S</b>, time <b>-t</b>, version <b>-v</b>
        <dt><b>--time</b>=<i>WORD</i>
        <dd>with <b>-l</b>, show time as WORD instead of modification time: atime <b>-u</b>, access <b>-u</b>, use <b>-u</b>, ctime <b>-c</b>, or status <b>-c</b>; use
        specified time as sort key if <b>--sort</b>=<i>time</i>
        <dt><b>--time-style</b>=<i>STYLE</i>
        <dd>with <b>-l</b>, show times using style STYLE: full-iso, long-iso, iso, locale, +FORMAT. FORMAT is interpreted like 'date'; if FORMAT is
        FORMAT1&lt;newline&gt;FORMAT2, FORMAT1 applies to non-recent files and FORMAT2 to recent files; if STYLE is prefixed with 'posix-', STYLE takes effect only
        outside the POSIX locale
        <dt><b>-t</b>
        <dd>sort by modification time
        <dt><b>-T</b>, <b>--tabsize</b>=<i>COLS</i>
        <dd>assume tab stops at each COLS instead of 8
        <dt><b>-u</b>
        <dd>with <b>-lt</b>: sort by, and show, access time with <b>-l</b>: show access time and sort by name otherwise: sort by access time
        <dt><b>-U</b>
        <dd>do not sort; list entries in directory order
        <dt><b>-v</b>
        <dd>natural sort of (version) numbers within text
        <dt><b>-w</b>, <b>--width</b>=<i>COLS</i>
        <dd>assume screen width instead of current value
        <dt><b>-x</b>
        <dd>list entries by lines instead of by columns
        <dt><b>-X</b>
        <dd>sort alphabetically by entry extension
        <dt><b>-1</b>
        <dd>list one file per line</dl>
        </div>
        `),

        (`
        <div  class = 'h2Item'>
        <p>SELinux options:
        <dl compact>
        <dt><b>--lcontext</b>
        <dd>Display security context. Enable <b>-l</b>. Lines will probably be too wide for most displays.
        <dt><b>-Z</b>, <b>--context</b>
        <dd>Display security context so it fits on most displays. Displays only mode, user, group, security context and file name.
        <dt><b>--scontext</b>
        <dd>Display only security context and file name.
        <dt><b>--help</b>
        <dd>display this help and exit
        <dt><b>--version</b>
        <dd>output version information and exit</dl>
        <p>SIZE may be (or may be an integer optionally followed by) one of following: KB 1000, K 1024, MB 1000*1000, M 1024*1024, and so on for G, T, P, E, Z, Y.
        <p>Using color to distinguish file types is disabled both by default and with <b>--color</b>=<i>never</i>. With <b>--color</b>=<i>auto</i>, ls emits color
        codes only when standard output is connected to a terminal. The LS_COLORS environment variable can change the settings. Use the dircolors command to set it.
        <h3>Exit status:</h3>
        <ol>
        <li>if OK,
        <li>if minor problems (e.g., cannot access subdirectory),
        <li>if serious trouble (e.g., cannot access command-line argument).</ol>
        </div>
        `),

        (`
        <div  class = 'h2Item'>
        <h2>Author</h2>
        <p>Written by Richard M. Stallman and David Ma </p>
        </div>
        `)
        
    );

module.exports = { manLs };





