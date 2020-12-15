import {manFile} from './model/manFile.js';

export const manCd = new manFile(

        (`
        <div  class = 'h2Item'>
        <h2>Name</h2>
        cd-info - manual page for cd-info
        </div>
        `),

        (`
        <div  class = 'h2Item'>
        <h2>Synopsis</h2>
        <b>cd-info</b> <i>OPTION</i>...
        <dl compact>
        <dt>Shows Information about a CD or CD-image.</dl>
        </div>
        `),


        (`
        <div  class = 'h2Item'>
        <h2>Description</h2>
        <h3>Help options:</h3>
        <dl compact>
        <dt><b>--help</b>
        <dd>Show this help message
        </div>
        `),

        (`
        <div  class = 'h2Item'>
            <pre><b>EXAMPLES</b>
            The following template can be used to perform processing in the  direc‐
            tory  specified by <u style="text-decoration-style:single">location</u> and end up in the current working directory
            in use before the first <u style="text-decoration-style:single">cd</u> command was issued:
     
                <b>cd</b> <u style="text-decoration-style:single">location</u>
                <b>if</b> <b>[</b> <b>$?</b> <b>-ne</b> <b>0</b> <b>]</b>
                <b>then</b>
                    <b>print</b> <b>error</b> <b>message</b>
                    <b>exit</b> <b>1</b>
                <b>fi</b>
                <b>...</b> <b>do</b> <b>whatever</b> <b>is</b> <b>desired</b> <b>as</b> <b>long</b> <b>as</b> <b>the</b> <b>OLDPWD</b> <b>environment</b> <b>variable</b>
                    <b>is</b> <b>not</b> <b>modified</b>
                <b>cd</b> <b>-</b>
                </pre>
                </div>
        `),

        (`
        <div  class = 'h2Item'>
        <h2>Author</h2>
        Rocky Bernstein <a href="mailto:rocky@panix.com">rocky@panix.com</a>, based on the cdinfo program by Gerd Knorr
        &lt;<a href="mailto:kraxel@bytesex.org">kraxel@bytesex.org</a>&gt; and Heiko Eissfeldt &lt;<a href="mailto:heiko@hexco.de">heiko@hexco.de</a>&gt;
        </div>
        `)
    );


//module.exports = { manCd };