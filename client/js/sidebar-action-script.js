const loadAction = async () => {
    document.querySelectorAll('.action').forEach((button) => {
        button.addEventListener('click', async (event) => {
            let target = event.target;
            target = target.tagName === 'SPAN' ? target.parentNode : target;
            console.log(target.getAttribute('page'));

            const container = document.querySelector('.main-container');
            container.innerHTML = await loadPage(target.getAttribute('page'));
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
;
}

await loadAction();