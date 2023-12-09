`start chrome --user-data-dir="C://chrome-dev-disabled-security" --disable-web-security --disable-site-isolation-trials --`


let trackArt = document.querySelector(".track-art");
let title = document.querySelector(".title");
let artist = document.querySelector(".artist");

let playPauseBtn = document.querySelector(".playpause-track");
let nextBtn = document.querySelector(".next-track");
let prevBtn = document.querySelector(".prev-track");

let trackSlider = document.querySelector(".track-slider");
let volumeSlider = document.querySelector(".volume-slider");
let currentTime = document.querySelector(".current-time");
let totalDuration = document.querySelector(".total-duration");
let randomBtn = document.querySelector(".random-track");
let repeatBtn = document.querySelector(".repeat-track");

let currentTrack = document.createElement("audio");

let trackIndex = 0;
let isPlaying = false;
let isRandom = false;
let isRepeat = false;

console.log("scripts.js");

volumeSlider.value = 0.4;
currentTrack.volume = volumeSlider.value;

const getMusic = async function() {
    try {
        const response = await fetch(`http://localhost:5000/music`);
        const music = await response.json();
        return music;
    } catch (error) {
        console.log("error : ", error);
    }
}

const trackList = await getMusic();
console.log("trackList : ", trackList);

loadTrack(trackList[trackIndex]);

//charger une musique
function loadTrack(track) {
    currentTrack.src = "../../" + track.path;
    currentTrack.load();
    title.textContent = track.title;
    artist.textContent = track.artist;
    trackSlider.max = track.duration;

    currentTime.textContent = "0:00";
    totalDuration.textContent = buildDuration(track.duration);
}


//gestion de la lecture
playPauseBtn.addEventListener("click", function() {
    if(!isPlaying) {
        currentTrack.play();
        isPlaying = true;
        this.innerHTML = '<i class="bi bi-pause-circle-fill bi3em" ></i>';
    } else {
        currentTrack.pause();
        isPlaying = false;
        this.innerHTML = '<i class="bi bi-play-circle-fill bi3em"></i>';
    }
});



trackSlider.addEventListener("input", function() {
    console.log(this.value);
    currentTime.textContent = buildDuration(this.value);
    currentTrack.currentTime = this.value;
    // const value = (this.value - this.min) / (this.max - this.min) * 100;
    // this.style.background = `linear-gradient(to right, #f9d423 0%, #f9d423 ${value}%, #fff ${value}%, white 100%)`;
});

//gestion du volume
volumeSlider.addEventListener("input", function() {
    console.log(this.value);
    currentTrack.volume = this.value;
});


//update de la durée de la musique
currentTrack.addEventListener("timeupdate", function() {
    trackSlider.value = this.currentTime;
    currentTime.textContent = buildDuration(this.currentTime);
});

repeatBtn.addEventListener("click", function() {
    if(!isRepeat) {
        isRepeat = true;
        repeatBtn.innerHTML = '<i class="bi bi-repeat-1 bi3em"></i>';
    } else {
        isRepeat = false;
        repeatBtn.innerHTML = '<i class="bi bi-repeat bi3em"></i>';
    }
});

currentTrack.addEventListener("ended", function() {
    if(isRepeat) {
        loadTrack(trackList[trackIndex]);
        currentTrack.play();
    }
});

prevBtn.addEventListener("click", function() {
    if(currentTrack.currentTime > 5) {
        currentTrack.currentTime = 0;
    } else {
        prevTrack();
    }
});

nextBtn.addEventListener("click", function() {
    nextTrack();
});

randomBtn.addEventListener("click", function() {
    this.style.color = isRandom ? "black" : "green";
    isRandom = !isRandom;
    
});





const prevTrack = function() {
    trackIndex--;
    if(trackIndex < 0) {
        trackIndex = trackList.length -1;
    }
    loadTrack(trackList[trackIndex]);
    currentTrack.play();
};

const nextTrack = function() {
    if(isRandom) {
        trackIndex = Math.floor(Math.random() * trackList.length);
    } else {
        trackIndex++;
        if(trackIndex >= trackList.length) {
            trackIndex = 0;
        }
    }

    loadTrack(trackList[trackIndex]);
    currentTrack.play();
};















function buildDuration(duration) {
    let minutes = Math.floor(duration / 60);
    let reste = duration % 60;
    let secondes = Math.floor(reste);
    secondes = String(secondes).padStart(2, "0");
    return minutes + ":" + secondes;
}











// const audio = document.querySelector("audio");
// const track = document.querySelector("#track");
// const elapsed = document.querySelector("#elapsed");
// const trackTime = document.querySelector("#track-time");
// const playButton = document.querySelector("#play-button");
// const pauseButton = document.querySelector("#pause-button");
// const volume = document.querySelector("#volume");
// const volumeValue = document.querySelector("#volume-value");
// const musicTitle = document.querySelector("#music-title")
// const musicArtist = document.querySelector("#music-artist")
// const skipNext = document.querySelector("#skip-next");
// const skipForward = document.querySelector("#skip-forward");

// let playListMusic = 0;
// audio.volume = volume.value;

// let getDuration = function() {
//     return new Promise((resolve) => {
//         audio.addEventListener("loadedmetadata", function() {
//             resolve(audio.duration);
//         });
//     });
// }

// getDuration()
//     .then((duration) => {
//         track.max = duration;
//         trackTime.textContent = buildDuration(duration);
//         elapsed.textContent = "0:00";
//     });

// playButton.addEventListener("click", function() {
//     audio.play();
//     audio.volume = volume.value;
//     pauseButton.style.display = "initial";
//     this.style.display = "none";
// });

// pauseButton.addEventListener("click", function() {
//     audio.pause();
//     playButton.style.display = "initial";
//     this.style.display = "none";
// });

// audio.addEventListener("timeupdate", function() {
//     if(this.duration == this.currentTime) {
//         console.log("passe à la musique d'après !");
//         musicNext();
//     }

//     track.value = this.currentTime;
//     const value = (track.value - track.min) / (track.max - track.min) * 100;

//     track.style.background = `linear-gradient(to right, #f9d423 0%, #f9d423 ${value}%, #fff ${value}%, white 100%)`;
//     elapsed.textContent = buildDuration(this.currentTime);
// });



// track.addEventListener("input", function() {
//     const value = (this.value - this.min) / (this.max - this.min) * 100;
//     this.style.background = `linear-gradient(to right, #f9d423 0%, #f9d423 ${value}%, #fff ${value}%, white 100%)`;

//     elapsed.textContent = buildDuration(this.value);
//     audio.currentTime = this.value;
// });

// volume.addEventListener("input", function() {
//     audio.volume = this.value;
//     console.log("volume : ", this.value);
//     volumeValue.textContent = Math.floor(this.value * 100) + "%";

// })
 
// function buildDuration(duration) {
//     let minutes = Math.floor(duration / 60);
//     let reste = duration % 60;
//     let secondes = Math.floor(reste);
//     secondes = String(secondes).padStart(2, "0");
//     return minutes + ":" + secondes;
// }

// skipNext.addEventListener("click", function() {
//     console.log("next");
//     musicNext();
// });

// skipForward.addEventListener("click", function() {
//     console.log("forward");
//     musicForward();
// })

// function musicNext() {
//     playListMusic += 1;
//     if(playListMusic == playList.length) {
//         playListMusic = 0;
//     }

//     const path = "../../" + playList[playListMusic].path;
//     const title = playList[playListMusic].title;
//     const artist = playList[playListMusic].artist;

//     console.log("path : ", path);
//     console.log("music : ", title);

//     audio.src = path;
//     setTitle(title);
//     setArtist(artist);
    
//     audio.play();
//     playButton.style.display = "none";
//     pauseButton.style.display = "initial";


//     track.max = audio.duration;

//     getDuration()
//         .then((duration) => {
//             track.max = duration;
//             trackTime.textContent = buildDuration(duration);
//             elapsed.textContent = "0:00";
//         });
// }

// function musicForward() {
//     playListMusic -= 1;
//     if(playListMusic < 0) {
//         playListMusic = playList.length -1;
//     }

//     const path = "../../" + playList[playListMusic].path;
//     const title = playList[playListMusic].title;
//     const artist = playList[playListMusic].artiste;

//     console.log("path : ", path);
//     console.log("music : ",title);
    
//     audio.src = path;
//     setTitle(title);
//     setArtist(artist);
    
//     audio.play();
//     playButton.style.display = "none";
//     pauseButton.style.display = "initial";


//     getDuration()
//         .then((duration) => {
//             track.max = duration;
//             trackTime.textContent = buildDuration(duration);
//             elapsed.textContent = "0:00";
//         });
// }

// function setTitle(title) {
//     musicTitle.textContent = title;
// }

// function setArtist(artist) {
//     musicArtist.textContent = artist;
// }






// let playlist = document.querySelector('.playlist');
// let playlistButton = document.querySelector('#playlist-button');

// playlistButton.addEventListener('click', function() {
//     playlist.classList.togle
// });
