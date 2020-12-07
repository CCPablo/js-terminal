

document.onkeypress = function(evt) {
    evt = evt || window.event;
    let charKey = evt.key;

    let $input2 = document.querySelector('.terminal__input')
    const $divOutput = document.querySelector('.terminal__output')


    if (evt.ctrlKey && charKey == "l") {
        alert('entras')
        $input2.value  = '';
        $divOutput.classList.add('sticky')
        var scrollPos = 0;
        window.addEventListener('scroll', function(){
            if ((document.body.getBoundingClientRect()).top > scrollPos)
                console.log('to para arriba')
            else
                // ABAJO
            scrollPos = (document.body.getBoundingClientRect()).top;
            console.log('to para arriba')
        });
    };
};
