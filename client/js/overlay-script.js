const closeBtn = document.querySelector('.close-overlay');

closeBtn.addEventListener('click', () => {
    console.log('close button clicked');
    overlay.classList.toggle('close');
});