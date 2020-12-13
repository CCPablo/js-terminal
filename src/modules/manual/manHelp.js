import {manFile} from './model/manFile.js';

export const manHelp = new manFile (

        (`
        <div  class = 'h2Item'>
        <h2>NAME</h2>
        help - display help information about the command
        </div>
        `),

        (`
        <div  class = 'h2Item'>
        <h2>SYNOPSIS</h2>
        <p>help ... ls, cd, man etc </p>
        </div>
        `),

        (`
        <div  class = 'h2Item'>
        <h2>DESCRIPTION</h2>
        <pre>
        The help command alone gives a user a brief description of all the commands available
        in your Terminal and a brief explanation of each one.
        
        Placing help + the command will give you the description of the specified command.
        </pre>
        </div>
        `),

        (`
        <div  class = 'h2Item'>
        <h2>EXAMPLES</h2>
        <pre>
        <strong> ls help </strong> will give you the brief description of the command ls
        </pre>
        </div>
        `),


        (`
        <div  class = 'h2Item'>
        <h2>AUTHOR</h2>
        <p> Author unknown </p>
        </div>
        `)
    );

//module.exports = { manClear };

