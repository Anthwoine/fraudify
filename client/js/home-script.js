console.log('home script');


const container = document.querySelector('.test');

if(container) {
    console.log('element trouvé');
    container.addEventListener('click', () => {
        console.log('home script');
    });
} else {
    console.log('element introuvable');
}


