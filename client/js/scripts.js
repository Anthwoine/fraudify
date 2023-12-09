`start chrome --user-data-dir="C://chrome-dev-disabled-security" --disable-web-security --disable-site-isolation-trials --`


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
        const response = await fetch(`https://fraudify.aegir.ovh/music`);
        const music = await response.json();
        return music;
    } catch (error) {
        console.log("error : ", error);
    }
}

const trackList = await getMusic();
const image = "../../assets/images/default.png";
console.log("trackList : ", trackList);

loadTrack(trackList[trackIndex]);

//charger une musique
function loadTrack(track) {
    currentTrack.src = `../../assets/music/${track.title}.mp3`;
    currentTrack.load();
    title.textContent = track.title;
    artist.textContent = track.artist;
    trackSlider.max = track.duration;
    trackArt.style.backgroundImage = `url(${image})`;


    currentTime.textContent = "0:00";
    totalDuration.textContent = buildDuration(track.duration);
}


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
    if (this.value <= 0.01) {
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
        volumeIcon.className = volumeValue >= 0.5 ? "bi bi-volume-up-fill bi3em" : volumeValue <= 0.01 ? "bi bi-volume-mute-fill bi3em" : "bi bi-volume-down-fill bi3em";
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



const prevTrack = function () {
    trackIndex--;
    if (trackIndex < 0) {
        trackIndex = trackList.length - 1;
    }
    loadTrack(trackList[trackIndex]);
    isPlaying ? currentTrack.play() : currentTrack.pause();
};

const nextTrack = function () {
    if (isRandom) {
        trackIndex = Math.floor(Math.random() * trackList.length);
    } else {
        trackIndex++;
        if (trackIndex >= trackList.length) {
            trackIndex = 0;
        }
    }

    loadTrack(trackList[trackIndex]);
    isPlaying ? currentTrack.play() : currentTrack.pause();
};


function buildDuration(duration) {
    let minutes = Math.floor(duration / 60);
    let reste = duration % 60;
    let secondes = Math.floor(reste);
    secondes = String(secondes).padStart(2, "0");
    return minutes + ":" + secondes;
}