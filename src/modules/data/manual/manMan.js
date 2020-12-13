import {manFile} from '../model/manFile.js';

export const manMan = new manFile (

        (`
        <div  class = 'h2Item'>
        <h2>NAME</h2>
        man - Shows you the system reference manual for each command
        <br>
        </div>
        `),

        (`
        <div  class = 'h2Item'>
        <h2>SYNOPSIS</h2>
        <p>man + command will give you the reference document</p>
        <p>man alone will give you the documentation of all the commands</p>
        <br>
        </div>
        `),

        (`
        <div  class = 'h2Item'>
        <h2>DESCRIPTION</h2>
        <pre>
        <strong> man </strong> is  the system's manual pager.  Each page argument given to man is
        normally the name of a program, utility or function.  The  manual  page
        associated with each of these arguments is then found and displayed.  A
        section, if provided, will direct man to look only in that  section  of
        the  manual.   The  default action is to search in all of the available
        sections following a pre-defined order (see DEFAULTS), and to show only
        the first page found, even if page exists in several sections.
        </pre>
        </div>
        `),

        (`
        <div  class = 'h2Item'>
        <h2>Examples</h2>
        <pre>
        man ls
        Display the manual page for the item (program) ls.

        man cd
        Display the manual page for the item (program) cd.

        man
        Display the manual page of all the commands.

        </pre>
        </div>
        `),


        (`
        <div  class = 'h2Item'>
        <h2>HISTORY</h2>
        <pre>
        1990, 1991 – Originally written by <strong>John W. Eaton </strong>(jwe@che.utexas.edu).

        Dec 23 1992: Rik Faith (faith@cs.unc.edu) applied bug fixes supplied by
        Willem Kasdorp (wkasdo@nikhefk.nikef.nl).
 
        30th April 1994 – 23rd February 2000: Wilf. (G.Wilford@ee.surrey.ac.uk)
        has been developing and maintaining this package with the help of a few
        dedicated people.
 
        30th October 1996 – 30th March  2001:  Fabrizio  Polacco  <fpolacco@de‐
        bian.org>  maintained and enhanced this package for the Debian project,
        with the help of all the community.
 
        31st March 2001 – present day: Colin  Watson  <cjwatson@debian.org>  is
        now developing and maintaining man-db.
        </pre>
        </div>
        `)
    );

//module.exports = { manClear };

