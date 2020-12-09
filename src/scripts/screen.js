const $buttonFullScreen = document.querySelector('#fullscreen');
const $headerTerminal = document.querySelector('.terminal__header');
const $terminalContiner = document.querySelector('#terminal');
const $allWindow = document.querySelector('.container');

$buttonFullScreen.addEventListener('click', openFullscreen);
$headerTerminal.addEventListener('dblclick', openFullscreen);


function openFullscreen() {

    if ($terminalContiner.requestFullscreen) {
        $terminalContiner.requestFullscreen();

    } else if ($terminalContiner.webkitRequestFullscreen) { /* Safari */
        $terminalContiner.webkitRequestFullscreen();

    } else if ($terminalContiner.msRequestFullscreen) { /* IE11 */
        $terminalContiner.msRequestFullscreen();
    }
}