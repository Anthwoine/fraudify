const overlayBtn = document.querySelector('.overlay-button');
const overlay = document.querySelector('.music-overlay');

overlayBtn.addEventListener('click', () => {
    overlay.classList.toggle('close');
});   