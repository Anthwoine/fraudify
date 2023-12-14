let wrapper = document.querySelector(".wrapper");

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

let trackList;

let trackIndex = 0;
let volumeValue = 0.05;

let isPlaying = false;
let isRandom = false;
let isRepeat = false;
let isMute = false;

trackList = await getMusic();



const image = "../../assets/images/default.png";


volumeSlider.value = volumeValue;
currentTrack.volume = volumeSlider.value;
setVolumeIcon(volumeSlider.value);

if (!trackList || trackList.length === 0) {
    wrapper.style.display = "none";
} else {
    await loadTrack(trackList[trackIndex]);
    await builPlaylist(trackList);

    playlist.children[trackIndex].classList.toggle("song-active");
    console.log('music ready');
}






//gestion de la playlist
playlist.addEventListener("click", function (event) {
    const target = event.target;
    if (target.classList.contains("playlist-play-button")) {
        playlist.children[trackIndex].classList.toggle("song-active");
        trackIndex = target.id;
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


//gestion du slider de la musique
trackSlider.addEventListener("input", function () {
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
    volumeValue = this.value;
    currentTrack.volume = this.value;
});


//gestion du mute
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


//gestion du repeat
repeatBtn.addEventListener("click", function () {
    if (!isRepeat) {
        isRepeat = true;
        repeatBtn.innerHTML = '<i class="bi bi-repeat-1 bi3em"></i>';
    } else {
        isRepeat = false;
        repeatBtn.innerHTML = '<i class="bi bi-repeat bi3em"></i>';
    }
});


//passer à la musique suivante quand la musique en cours est terminée
currentTrack.addEventListener("ended", function () {
    if (isRepeat) {
        loadTrack(trackList[trackIndex]);
        currentTrack.play();
    } else {
        nextTrack();
    }
});


//passer à la musique précédente
prevBtn.addEventListener("click", function () {
    if (currentTrack.currentTime > 5) {
        currentTrack.currentTime = 0;
    } else {
        prevTrack();
    }
});

//passer à la musique suivante
nextBtn.addEventListener("click", function () {
    nextTrack();
});


//musique random
randomBtn.addEventListener("click", function () {
    isRandom = !isRandom;
    if(isRandom){
        this.innerHTML = '<i class="bi bi-shuffle bi3em"></i>';
    } else {
        this.innerHTML = '<i class="bi bi-arrow-left-right bi3em"></i>';
    }
    

});


//afficher les options
optionsBtn.addEventListener("click", function () {
    options.classList.toggle("active2");
});

playlistBtn.addEventListener("click", function () {
    playlist.classList.toggle("active");
});



//passer à la musique précédente
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

//passer à la musique suivante
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
    try {
        currentTrack.src = `../../assets/music/${track.title}.mp3`;
        currentTrack.load();
    } catch(error) {
        console.log("loadtrack error : ",error);
        nextTrack();
    }

    title.textContent = track.title;
    artist.textContent = track.artist;
    trackSlider.max = track.duration;

    currentTime.textContent = "0:00";
    totalDuration.textContent = buildDuration(track.duration);

    let img = await getImage(track);
    trackArt.style.backgroundImage = img ? `url(${img})` : `url(${image})`;




}

//construire la playlist
async function builPlaylist(tracklist) {
    for (let i = 0; i < tracklist.length; i++) {
        const newSong = document.createElement("div");
        const img = await getImage(tracklist[i]);
        console.log(img);
        newSong.className = "p-song";
        newSong.innerHTML = `
                <div class="playlist-art"></div>
                <div class="playlist-details">
                    <p class="p-title">${tracklist[i].title}</p>
                    <p class="p-artist">${tracklist[i].artist} - ${buildDuration(trackList[i].duration)}</p>
                </div>
                <i id="${i}" class="bi bi-play-circle-fill playlist-play-button" style="font-size: 3rem"></i>`;
        newSong.children[0].style.backgroundImage = img ? `url(${img})` : `url(${image})`;
        
        playlist.appendChild(newSong);
    }
}

//changer l'icone du volume
function setVolumeIcon(volume) {
    if (volume < 0.01) {
        volumeIcon.className = "bi bi-volume-mute-fill bi3em";
    } else if (volume < 0.5) {
        volumeIcon.className = "bi bi-volume-down-fill bi3em";
    } else {
        volumeIcon.className = "bi bi-volume-up-fill bi3em";
    }
}

//récupérer l'image de la musique
async function getImage(track) {
    const artist = track.artist;
    const title = track.title;

    const requestData = {
        artist: artist,
        title: title
    }

    try {
        const response = await fetch(`/api/image`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
        });
        const data = await response.json();
        return data.img;
    } catch (error) {
        return;
    }

}


async function getMusic() {
    try {
        const response = await fetch(`/api/music`);
        const music = await response.json();
        return music;
    } catch (error) {
        return;
    }
}






