const body = document.querySelector('body');
const sidebar = document.querySelector('.sidebar');
const toggle = document.querySelector('.toggle');
const searchBtn = document.querySelector('.search-box');
const modeSwitch = document.querySelector('.toggle-switch');
const modeText = document.querySelector('.mode-text');


document.addEventListener('DOMContentLoaded', () => {
    modeSwitch.addEventListener('click', () => {
        body.classList.toggle('dark');
    
        if(body.classList.contains('dark')) {
            modeText.textContent = 'Light Mode';
        } else {
            modeText.textContent = 'Dark Mode';
        }
    });
    
    searchBtn.addEventListener('click', () => {
        sidebar.classList.remove('close');
    });
    
    toggle.addEventListener('click', () => {
        sidebar.classList.toggle('close');
    });
});
