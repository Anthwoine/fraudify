import { SnackbarBuilder } from "./class/snackbar.js";

console.log('download script');

(function () {
    const audioArt = document.querySelector('.audio-art');
    audioArt.style.backgroundImage = 'url(../../assets/images/default.png)';
})();

(function () {
    const details = document.querySelector('.download-details');
    const audioArt = document.querySelector('.audio-art');

    const title = details.querySelector('.title-input');
    const artist = details.querySelector('.artist-input');
    const duration = details.querySelector('.duration');

    const search = document.querySelector('.search-button');
    const urlInput = document.querySelector('.download-input');
    search.addEventListener('click', async () => {
        const url = urlInput.value;
        if(url === '') return;

        const musicInfo = await searchMusic(url);
        if(!musicInfo) return;

        console.log('musicInfo: ', musicInfo);

        const img = musicInfo.image ? musicInfo.image : '../../assets/images/default.png';
        audioArt.style.backgroundImage = `url(${img})`;
        title.value = musicInfo.title;
        artist.value = musicInfo.artist;
        duration.textContent = buildDuration(musicInfo.duration);

        details.classList.remove('hidden');
    });
})(); 

(function () {
    const editArtist = document.querySelector('.icon-artist'); 
    const editTitle = document.querySelector('.icon-title');

    const artist = document.querySelector('.artist-input');
    const title = document.querySelector('.title-input');

    handleEditClick(editArtist, artist);
    handleEditClick(editTitle, title);

    function handleEditClick(editIcon, input) {
        editIcon.addEventListener('click', async () => {
            editIcon.classList.toggle('active');
            
            const isActived = editIcon.classList.contains('active');
            if(isActived) {
                input.removeAttribute('disabled');
            } else {
                input.setAttribute('disabled', true);
                const data = await searchImage(title.value, artist.value);
                console.log('data: (image)', data);

                const img = data ? data : '../../assets/images/default.png';
                const audioArt = document.querySelector('.audio-art');
                audioArt.style.backgroundImage = `url(${img})`; 
            }
        });
    }
})();

(function () {
    const button = document.querySelector('.download-button')

    const artist = document.querySelector('.artist-input');
    const title = document.querySelector('.title-input');
    const url = document.querySelector('.download-input');

    button.addEventListener('click', async () => {
        const urlValue = url.value;
        const artistValue = artist.value;
        const titleValue = title.value;

        console.log(urlValue, artistValue, titleValue);
        await downloadMusic(urlValue, titleValue, artistValue);
    });
})();

async function searchMusic(url) {
    const result = await fetch('api/music/info', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url })
    });

    if(result.status === 200) {
        const data = await result.json();
        return data;
    } else {
        console.log('erreur lors de la récupération des informations de la musique');
    }
}

async function searchImage(title, artist) {
    const result = await fetch(`api/music/img/${title}/${artist}`);

    if(result.status === 200) {
        const data = await result.json();
        return data.image;
    } else {
        console.log('erreur lors de la récupération de l\'image');
    }
}

async function downloadMusic(url, title, artist) {
    const result = await fetch('/api/music/download', {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({ 
            url : url,
            title : title,
            artist : artist 
        })
    }); 

    if(result.status === 200) {
        const snackbar = new SnackbarBuilder('Téléchargement réussi')
        .buildSuccess();

        snackbar.render(document.querySelector('.snackbar-container'));
        return;
    }

    if(result.status === 409) {
        const snackbar = new SnackbarBuilder('Musique déjà téléchargée')
        .buildWarning();

        snackbar.render(document.querySelector('.snackbar-container'));
        return;
    }

    if(result.status === 500) {
        const snackbar = new SnackbarBuilder('Erreur lors du téléchargement')
        .buildError();

        snackbar.render(document.querySelector('.snackbar-container'));
        return;
    }
}

function buildDuration(duration) {
    let minutes = Math.floor(duration / 60);
    let reste = duration % 60;
    let secondes = Math.floor(reste);
    secondes = String(secondes).padStart(2, "0");
    return minutes + ":" + secondes;
}
