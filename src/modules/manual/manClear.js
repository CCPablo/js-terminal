import {manFile} from './model/manFile.js';

export const manClear = new manFile (

        (`
        <div  class = 'h2Item'>
        <h2>NAME</h2>
        clear - clear the terminal screen
        </div>
        `),

        (`
        <div  class = 'h2Item'>
        <h2>SYNOPSIS</h2>
        <p>clear [-Ttype] [-V] [-x]</p>
        </div>
        `),

        (`
        <div  class = 'h2Item'>
        <h2>DESCRIPTION</h2>
        <pre>clear  clears your screen if this is possible, including its scrollback
        buffer (if the extended “E3” capability is defined).   clear  looks  in
        the environment for the terminal type given by the environment variable
        TERM, and then in the terminfo database to determine how to  clear  the
        screen.

        clear  writes  to  the  standard output.  You can redirect the standard
        output to a file (which  prevents  clear  from  actually  clearing  the
        screen),  and  later  cat  the  file to the screen, clearing it at that
        point.</pre>
        </div>
        `),

        (`
        <div  class = 'h2Item'>
        <h2>OPTIONS</h2>
        <pre>Shortcut with ctrol+L
        </pre>
        </div>
        `),


        (`
        <div  class = 'h2Item'>
        <h2>HISTORY</h2>
        <pre>
        A  clear  command  appeared  in 2.79BSD dated February 24, 1979.  Later
        that was provided in Unix 8th edition (1985).

        AT&T adapted a different BSD program  (tset)  to  make  a  new  command
        (tput),  and used this to replace the clear command with a shell script
        which calls tput clear, e.g.,

        In 1989, when Keith Bostic revised the BSD tput command to make it sim‐
        ilar to the AT&T tput, he added a shell script for the clear command:

        exec tput clear

        The remainder of the script in each case is a copyright notice.

        The  ncurses  clear  command began in 1995 by adapting the original BSD
        clear command (with terminfo, of course).
        </pre>
        </div>
        `)
    );

