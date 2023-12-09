`start chrome --user-data-dir="C://chrome-dev-disabled-security" --disable-web-security --disable-site-isolation-trials --`

const LASTFM_API_KEY = "03ba2d7bf27a0b9b9c11b8a6d767c4ef";
const SHARED_SECRET = "839319fafcffbd4846766f0e1e624cbf";

const apiKey = '03ba2d7bf27a0b9b9c11b8a6d767c4ef';


let optionsBtn = document.querySelector(".options-button");
let options = document.querySelector(".options");

let playlistBtn = document.querySelector(".playlist-button");
let playlist = document.querySelector(".playlist");

let trackArt = document.querySelector(".track-art");
let title = document.querySelector(".title");
let artist = document.querySelector(".artist");

let playPauseBtn = document.querySelector(".playpause-track");
let nextBtn = document.querySelector(".next-track");
let prevBtn = document.querySelector(".prev-track");

let trackSlider = document.querySelector(".track-slider");
let volumeSlider = document.querySelector(".volume-slider");
let volumeIcon = document.querySelector("#volume-icon");
let currentTime = document.querySelector(".current-time");
let totalDuration = document.querySelector(".total-duration");
let randomBtn = document.querySelector(".random-track");
let repeatBtn = document.querySelector(".repeat-track");

let currentTrack = document.createElement("audio");

let playlistPlayButtons = document.querySelectorAll(".playlist-play-button");


let trackIndex = 0;
let volumeValue = 0.5
let isPlaying = false;
let isRandom = false;
let isRepeat = false;
let isMute = false;

console.log("scripts.js");


volumeSlider.value = 0.5;
currentTrack.volume = volumeSlider.value;

const getMusic = async function () {
    try {
        const response = await fetch(`/music`);
        const music = await response.json();
        return music;
    } catch (error) {
        console.log("error : ", error);
    }
}

const trackList = await getMusic();
const image = "../../assets/images/default.png";

builPlaylist(trackList);
await loadTrack(trackList[trackIndex]);
playlist.children[trackIndex].classList.toggle("song-active");

console.log('music ready');


playlist.addEventListener("click", function (event) {
    const target = event.target;
    console.log(target);
    if(target.classList.contains("playlist-play-button")){
        console.log("playlist-play-button");
        playlist.children[trackIndex].classList.toggle("song-active");
        trackIndex = target.id;
        console.log(trackIndex);
        playlist.children[trackIndex].classList.toggle("song-active");

        loadTrack(trackList[trackIndex]);
        isPlaying = true;
        playPauseBtn.innerHTML = '<i class="bi bi-pause-circle-fill" ></i>';
        currentTrack.play();
    }
});




//gestion de la lecture
playPauseBtn.addEventListener("click", function () {
    if (!isPlaying) {
        currentTrack.play();
        isPlaying = true;
        this.innerHTML = '<i class="bi bi-pause-circle-fill" ></i>';
    } else {
        currentTrack.pause();
        isPlaying = false;
        this.innerHTML = '<i class="bi bi-play-circle-fill"></i>';
    }
});



trackSlider.addEventListener("input", function () {
    console.log(this.value);
    currentTime.textContent = buildDuration(this.value);
    currentTrack.currentTime = this.value;

    // const value = (this.value - this.min) / (this.max - this.min) * 100;
    // this.style.background = `linear-gradient(to right, ##83a9ff 0%, ##83f9ff ${value}%, #fff ${value}%, white 100%)`;
});

//gestion du volume
volumeSlider.addEventListener("input", function () {
    if (this.value < 0.01) {
        volumeIcon.className = "bi bi-volume-mute-fill bi3em";
    } else if (this.value < 0.5) {
        volumeIcon.className = "bi bi-volume-down-fill bi3em";
    } else {
        volumeIcon.className = "bi bi-volume-up-fill bi3em";
    }

    console.log(this.value);
    volumeValue = this.value;
    currentTrack.volume = this.value;
});

volumeIcon.addEventListener("click", function () {
    if (!isMute) {
        isMute = true;
        volumeIcon.className = "bi bi-volume-mute-fill bi3em";
        volumeSlider.value = 0;
        currentTrack.volume = 0;
    } else {
        isMute = false;
        volumeIcon.className = volumeValue >= 0.5 ? "bi bi-volume-up-fill bi3em" : volumeValue < 0.01 ? "bi bi-volume-mute-fill bi3em" : "bi bi-volume-down-fill bi3em";
        volumeSlider.value = volumeValue;
        currentTrack.volume = volumeValue;
    }
});


//update de la durée de la musique
currentTrack.addEventListener("timeupdate", function () {
    trackSlider.value = this.currentTime;
    currentTime.textContent = buildDuration(this.currentTime);
});

repeatBtn.addEventListener("click", function () {
    if (!isRepeat) {
        isRepeat = true;
        repeatBtn.innerHTML = '<i class="bi bi-repeat-1 bi3em"></i>';
    } else {
        isRepeat = false;
        repeatBtn.innerHTML = '<i class="bi bi-repeat bi3em"></i>';
    }
});

currentTrack.addEventListener("ended", function () {
    if (isRepeat) {
        loadTrack(trackList[trackIndex]);
        currentTrack.play();
    } else {
        nextTrack();
    }
});

prevBtn.addEventListener("click", function () {
    if (currentTrack.currentTime > 5) {
        currentTrack.currentTime = 0;
    } else {
        prevTrack();
    }
});

nextBtn.addEventListener("click", function () {
    nextTrack();
});

randomBtn.addEventListener("click", function () {
    this.style.color = isRandom ? "black" : "green";
    isRandom = !isRandom;

});


//afficher les options
optionsBtn.addEventListener("click", function () {
    console.log("options");

    options.classList.toggle("active2");
    console.log(options.classList);
});

playlistBtn.addEventListener("click", function () {
    console.log("playlist");
    playlist.classList.toggle("active");
});




const prevTrack = function () {
    playlist.children[trackIndex].classList.toggle("song-active");
    trackIndex--;
    if (trackIndex < 0) {
        trackIndex = trackList.length - 1;
    }
    playlist.children[trackIndex].classList.toggle("song-active");

    loadTrack(trackList[trackIndex]);
    isPlaying ? currentTrack.play() : currentTrack.pause();
};

const nextTrack = function () {
    playlist.children[trackIndex].classList.toggle("song-active");
    if (isRandom) {
        trackIndex = Math.floor(Math.random() * trackList.length);
    } else {
        trackIndex++;
        if (trackIndex >= trackList.length) {
            trackIndex = 0;
        }
    }
    playlist.children[trackIndex].classList.toggle("song-active");

    loadTrack(trackList[trackIndex]);
    isPlaying ? currentTrack.play() : currentTrack.pause();
};

//construire la durée de la musique
function buildDuration(duration) {
    let minutes = Math.floor(duration / 60);
    let reste = duration % 60;
    let secondes = Math.floor(reste);
    secondes = String(secondes).padStart(2, "0");
    return minutes + ":" + secondes;
}


//charger une musique
async function loadTrack(track) {
    currentTrack.src = `../../assets/music/${track.title}.mp3`;
    currentTrack.load();
    title.textContent = track.title;
    artist.textContent = track.artist;
    trackSlider.max = track.duration;

    const img = await getTrackInfo(track.artist, track.title);
    console.log(img);
    trackArt.style.backgroundImage = img ? `url(${img})` : `url(${image})`;



    currentTime.textContent = "0:00";
    totalDuration.textContent = buildDuration(track.duration);
}

function builPlaylist(tracklist) {
    for (let i = 0; i < tracklist.length; i++) {
        const newSong = document.createElement("div");
        newSong.className = "p-song";
        newSong.innerHTML = `
                <p class="p-title">${tracklist[i].title}</p>
                <p class="p-artist">${tracklist[i].artist}</p>
                <i id="${i}" class="bi bi-play-circle-fill playlist-play-button" style="font-size: 3rem"></i>`;
        playlist.appendChild(newSong);
    }
}






async function getTrackInfo(artist, trackName) {
    try {
        const url = new URL('http://ws.audioscrobbler.com/2.0/');
        const params = {
            method: 'track.getInfo',
            artist,
            track: trackName,
            api_key: apiKey,
            format: 'json',
        };
        url.search = new URLSearchParams(params).toString();

        const response = await fetch(url.toString());
        const data = await response.json();

        const img = data.track.album.image.find(image => image.size === 'extralarge')['#text'];
        return img

        // Vous pouvez extraire les images ou d'autres informations ici
    } catch (error) {
        return
    }
}

// Exemple d'utilisation





