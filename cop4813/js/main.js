anime({
    targets: 'div.box',
    translateY: 55, 
    loop: true,
    direction: 'alternate',
    rotate: '2turn',
    scale: 1.3,
    easing: 'easeInOutQuad',  
    delay: anime.stagger(150),    
    
});

/*
anime({
    targets: 'div.box.blue',
    translateY: [
        { value: 200, duration: 500, delay: 1000},
        { value: 0, duration: 800 }
    ],
    rotate: {
        value: '1turn',
        easing: 'easeInOutSine',
        delay: 1000
    }
});

anime({
    targets: 'div.box.green',
    translateY: [
        { value: 200, duration: 500, delay: 2000},
        { value: 0, duration: 800 }
    ],
    rotate: {
        value: '1turn',
        easing: 'easeInOutSine',
        delay: 2000
    }
});

anime({
    targets: 'div.box.yellow',
    translateY: [
        { value: 200, duration: 500, delay: 3000},
        { value: 0, duration: 800 }
    ],
    rotate: {
        value: '1turn',
        easing: 'easeInOutSine',
        delay: 3000
    }
});
*/