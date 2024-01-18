const closeBtn = document.querySelector('.close-overlay');
const overlay = document.querySelector('.music-overlay');

closeBtn.addEventListener('click', () => {
    overlay.classList.toggle('close');
    document.querySelector('.overlay-button').classList.remove('active');
});