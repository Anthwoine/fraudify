const loadAction = async () => {
    document.querySelectorAll('.action').forEach((button) => {
        button.addEventListener('click', async (event) => {
            let target = event.target;
            target = target.tagName === 'SPAN' ? target.parentNode : target;
            console.log(target.getAttribute('page'));

            document.querySelectorAll('.action').forEach((button) => {
                button.classList.remove('active');
            });

            target.classList.add('active');

            const container = document.querySelector('.main-container');
            container.innerHTML = await loadPage(target.getAttribute('page'));

            const existingScript = document.querySelector('.action-script');
            if (existingScript) {
                existingScript.remove();
            }

            const script = document.createElement('script');
            script.src = `js/${target.getAttribute('page')}-script.js`;
            script.classList.add('action-script');
            script.defer = true;

            document.head.appendChild(script);
        });
    });
}

loadHome();
loadAction();











async function loadPage(page) {
    try {
        const response = await fetch(`template/${page}.html`);
        const html = await response.text();
        return html
    } catch (error) {
        console.error('error');
        return '';
    }
}

async function loadHome() {
    const container = document.querySelector('.main-container');
    container.innerHTML = await loadPage('home');
    const script = document.createElement('script');
    script.src = 'js/home-script.js';
    script.defer = true;
    document.head.appendChild(script);

    document.querySelector('[page="home"]').classList.add('active');
}   