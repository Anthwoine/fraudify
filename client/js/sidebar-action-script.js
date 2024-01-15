const loadAction = async () => {
    document.querySelectorAll('.action').forEach((button) => {
        button.addEventListener('click', async (event) => {
            let target = event.target;
            target = target.tagName === 'SPAN' ? target.parentNode : target;
            console.log(target.getAttribute('page'));

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

loadAction();

document.querySelectorAll('script').forEach((element) => {
    console.log(element.src);
});