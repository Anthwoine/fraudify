const search = document.querySelector('.bi-search');
const download = document.querySelector('.bi-download');
const url = document.querySelector('#url');


const img = document.querySelector('.track-art');

const title = document.querySelector('.title');
const artist = document.querySelector('.artist');
const duration = document.querySelector('.duration');

search.addEventListener('click', async () => {
    console.log('search');

    const urlValue = url.value;
    if (!urlValue) {
        alert('Veuillez entrer une url');
        return;
    }
    const result = await fetch('api/music/info', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: urlValue }),
    });

    const data = await result.json();
    console.log(data);

    console.log("data ok");

    if(img) {
        img.style.backgroundImage = `url(${data.image})`;
    }

    title.textContent = `Title: ${data.title}`;
    artist.textContent = `Artist: ${data.artist}`;
    duration.textContent = `Duration: ${data.duration}`;
    
});