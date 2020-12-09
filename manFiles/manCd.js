import manFile from './manFile';

const manCd = new manFile(

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
        <dl compact>
        <dt><b>-a</b>, <b>--access-mode</b>=<i>STRING</i>
        <dd>Set CD access method
        <dt><b>-d</b>, <b>--debug</b>=<i>INT</i>
        <dd>Set debugging to LEVEL
        <dt><b>-T</b>, <b>--no-tracks</b>
        <dd>Don't show track information
        <dt><b>-A</b>, <b>--no-analyze</b>
        <dd>Don't filesystem analysis
        <dt><b>--no-cddb</b>
        <dd>Does nothing since this program is not
        <dt><b>-P</b>, <b>--cddb-port</b>=<i>INT</i>
        <dd>CDDB-enabled
        <dt><b>-H</b>, <b>--cddb-<i>http</i></b>
        <dt><b>--cddb-server</b>=<i>STRING</i>
        <dt><b>--cddb-cache</b>=<i>STRING</i>
        <dt><b>--cddb-email</b>=<i>STRING</i>
        <dt><b>--no-cddb-cache</b>
        <dt><b>--cddb-timeout</b>=<i>INT</i>
        <dt><b>--no-device-info</b>
        <dd>Don't show device info, just CD info
        <dt><b>--no-disc-mode</b>
        <dd>Don't show disc-mode info
        <dt><b>--dvd</b>
        <dd>Attempt to give DVD information if a DVD is found.
        <dt><b>-v</b>, <b>--no-vcd</b>
        <dd>Don't look up Video CD information - for this build, this is always set
        <dt><b>-I</b>, <b>--no-ioctl</b>
        <dd>Don't show ioctl() information
        <dt><b>-b</b>, <b>--bin-file</b>[=<i>FILE</i>]
        <dd>set "bin" CD-ROM disk image file as source
        <dt><b>-c</b>, <b>--cue-file</b>[=<i>FILE</i>]
        <dd>set "cue" CD-ROM disk image file as source
        <dt><b>-N</b>, <b>--nrg-file</b>[=<i>FILE</i>]
        <dd>set Nero CD-ROM disk image file as source
        <dt><b>-t</b>, <b>--toc-file</b>[=<i>FILE</i>]
        <dd>set cdrdao CD-ROM disk image file as source
        <dt><b>-i</b>, <b>--input</b>[=<i>FILE</i>]
        <dd>set source and determine if "bin" image or device
        <dt><b>--iso9660</b>
        <dd>print directory contents of any ISO-9660 filesystems
        <dt><b>-C</b>, <b>--cdrom-device</b>[=<i>DEVICE</i>]
        <dd>set CD-ROM device as source
        <dt><b>-l</b>, <b>--list-drives</b>
        <dd>Give a list of CD-drives
        <dt><b>--no-header</b>
        <dd>Don't display header and copyright (for regression testing)
        <dt><b>--no-joliet</b>
        <dd>Don't use Joliet extensions
        <dt><b>--no-rock-ridge</b>
        <dd>Don't use Rock-Ridge-extension information
        <dt><b>--no-xa</b>
        <dd>Don't use XA-extension information
        <dt><b>-q</b>, <b>--quiet</b>
        <dd>Don't produce warning output
        <dt><b>-V</b>, <b>--version</b>
        <dd>display version and copyright information and exit</dl>
        <h3>Help options:</h3>
        <dl compact>
        <dt>-?, <b>--help</b>
        <dd>Show this help message
        <dt><b>--usage</b>
        <dd>Display brief usage message</dl>
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


module.exports = { manCd };