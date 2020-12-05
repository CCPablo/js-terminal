let manClear = `<h2>Name</h2>
        <p><b>clear</b> - clear the terminal screen
        <h2>Synopsis</h2>
        <p><b>clear</b>
        <h2>Description</h2>
        <p><b>clear</b> clears your screen if this is possible. It looks in the environment for the terminal type and then in the <b>terminfo</b> database to figure
        <p>out how to clear the screen.</p>
        <p><b>clear</b> ignores any command-line parameters that may be present.`;

module.exports = { manClear };