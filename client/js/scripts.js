
const audio = document.querySelector("audio");
const track = document.querySelector("#track");
const elapsed = document.querySelector("#elapsed");
const trackTime = document.querySelector("#track-time");
const playButton = document.querySelector("#play-button");
const pauseButton = document.querySelector("#pause-button");
const volume = document.querySelector("#volume");
const volumeValue = document.querySelector("#volume-value");
const musicTitle = document.querySelector("#music-title")
const skipNext = document.querySelector("#skip-next");
const skipForward = document.querySelector("#skip-forward");

let playListMusic = 0;

async function getMusic() {
    try {
        const response = await fetch(`http://localhost:5000/music`);
        const playList = await response.json();
        console.log("playList : ", playList);
        return playList;
    } catch (error) {
        console.log("error : ", error);
    }
}

let playList = await getMusic();



let getDuration = function() {
    return new Promise((resolve) => {
        audio.addEventListener("loadedmetadata", function() {
            resolve(audio.duration);
        });
    });
}

getDuration()
    .then((duration) => {
        track.max = duration;
        trackTime.textContent = buildDuration(duration);
        elapsed.textContent = "0:00";
    });

playButton.addEventListener("click", function() {
    audio.play();
    audio.volume = volume.value;
    pauseButton.style.display = "initial";
    this.style.display = "none";
});

pauseButton.addEventListener("click", function() {
    audio.pause();
    playButton.style.display = "initial";
    this.style.display = "none";
});

audio.addEventListener("timeupdate", function() {
    if(this.duration == this.currentTime) {
        console.log("passe à la musique d'après !");
        musicNext();
    }

    track.value = this.currentTime;
    elapsed.textContent = buildDuration(this.currentTime);
});



track.addEventListener("input", function() {
    console.log(this.value);
    elapsed.textContent = buildDuration(this.value);
    audio.currentTime = this.value;
});

volume.addEventListener("input", function() {
    audio.volume = this.value;
    volumeValue.textContent = Math.floor(this.value * 100) + "%";  
})
 
function buildDuration(duration) {
    let minutes = Math.floor(duration / 60);
    let reste = duration % 60;
    let secondes = Math.floor(reste);
    secondes = String(secondes).padStart(2, "0");
    return minutes + ":" + secondes;
}

skipNext.addEventListener("click", function() {
    console.log("next");
    musicNext();
});

skipForward.addEventListener("click", function() {
    console.log("forward");
    musicForward();
})

function musicNext() {
    playListMusic += 1;
    if(playListMusic == playList.length) {
        playListMusic = 0;
    }

    const path = "../" + playList[playListMusic].path;
    const title = playList[playListMusic].title;
    console.log("path : ", path);
    console.log("music : ", title);

    audio.src = path;
    setTitle(title);
    
    audio.play();

    track.max = audio.duration;

    getDuration()
        .then((duration) => {
            track.max = duration;
            trackTime.textContent = buildDuration(duration);
            elapsed.textContent = "0:00";
        });
}

function musicForward() {
    playListMusic -= 1;
    if(playListMusic < 0) {
        playListMusic = playList.length -1;
    }

    const path = "../" + playList[playListMusic].path;
    const title = playList[playListMusic].title;
    console.log("path : ", path);
    console.log("music : ",title);
    
    audio.src = path;
    setTitle(title);
    
    audio.play();


    getDuration()
        .then((duration) => {
            track.max = duration;
            trackTime.textContent = buildDuration(duration);
            elapsed.textContent = "0:00";
        });
}

function setTitle(title) {
    musicTitle.textContent = title;
}

