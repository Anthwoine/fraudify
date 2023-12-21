const search = document.querySelector('.bi-search');
const download = document.querySelector('.bi-download');
const url = document.querySelector('#url');


const img = document.querySelector('.track-art');

search.addEventListener('click', async () => {
    console.log('search');

    const urlValue = url.value;
    if (!urlValue) {
        alert('Veuillez entrer une url');
        return;
    }

    console.log(urlValue);
    console.log('loading...')
    const data = await loadInfoTrack(urlValue);
    console.log(data);

    img.style.backgroundImage = `url(${data.image})`;
});


const loadInfoTrack = async (url) => {
    try {
        const result = await fetch('api/music/info', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url: url }),
        });
    
        const data = await result.json();
        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
    
}