const Audio = document.createElement("audio");

const overlayBtn = document.querySelector('.overlay-button');
const overlay = document.querySelector('.music-overlay');

const shuffle = document.querySelector('.shuffle');
const repeat = document.querySelector('.repeat');
const likeBtn = document.querySelector('.like');

const previous = document.querySelector('.previous');
const next = document.querySelector('.next');
const playPause = document.querySelector('.play-pause');

const thumbnail = document.querySelector('.thumbnail');
const title = document.querySelector('.title');
const artist = document.querySelector('.artist');

const currentTime = document.querySelector('.current-time');
const duration = document.querySelector('.total-duration');
const audioSlider = document.querySelector('.track-slider');

const volumeSlider = document.querySelector('.volume-slider');
const volumeIcon = document.querySelector('.volume');

let audioIndex = 0;
let volumeValue = 0.20;

let currentAudio;
let currentInteraction;

let isPlaying = false;
let isRandom = false;
let isRepeat = false;
let isMute = false;

const imagePath = "../../../assets/images/";
const defaultImage = imagePath + "default.png";

let audioList = await getMusic();
const trueAudioList = audioList.slice();

(async function() {
    if(!audioList || audioList.length === 0) {
        console.log('no music');
    } else {
        await loadAudio(audioList[audioIndex]);
        updateVolume(volumeValue);
    }
})();


overlayBtn.addEventListener('click', () => {
    overlay.classList.toggle('close');
    overlayBtn.classList.toggle('active');
});


playPause.addEventListener('click', () => {
    if(!isPlaying) {
        Audio.play();
        isPlaying = true;
        playPause.textContent = 'pause_circle';
    } else {
        Audio.pause();
        isPlaying = false;
        playPause.textContent = 'play_circle';
    }
});

previous.addEventListener('click', () => {
    if(Audio.currentTime < 5) {
        previousAudio();
    } else {
        Audio.currentTime = 0;
    }
});

next.addEventListener('click', () => {
    if(isRepeat) {
        Audio.currentTime = 0;
        Audio.play();
    } else {
        nextAudio();
    }
});



shuffle.addEventListener('click', async () => {
    isRandom = !isRandom;
    shuffle.classList.toggle('active', isRandom);

    if (isRandom) {
        const shuffledList = shuffleArray([...trueAudioList]);
        audioIndex = shuffledList.indexOf(audioList[audioIndex]);
        audioList = shuffledList;
    } else {
        audioIndex = trueAudioList.indexOf(audioList[audioIndex]);
        audioList = trueAudioList.slice();
    }

    await loadOverlay(audioList[audioIndex]);
});


repeat.addEventListener('click', () => {
    isRepeat = !isRepeat;
    repeat.classList.toggle('active', isRepeat);
});

likeBtn.addEventListener('click', () => {
    likeBtn.classList.toggle('active');
});



Audio.addEventListener('timeupdate', () => {
    audioSlider.value = Audio.currentTime;
    currentTime.textContent = buildDuration(Audio.currentTime);
});

Audio.addEventListener('ended', () => {
    if(isRepeat) {
        Audio.currentTime = 0;
        Audio.play();
    } else {
        nextAudio();
    }
});





audioSlider.addEventListener('input', () => {
    currentTime.textContent = buildDuration(audioSlider.value);
    Audio.currentTime = audioSlider.value;
});

volumeSlider.addEventListener('input', () => {
    updateVolume(volumeSlider.value);
    volumeValue = volumeSlider.value;
});

volumeIcon.addEventListener('click', () => {
    if(!isMute) {
        volumeSlider.value = 0;
        updateVolume(0);
        isMute = true;
    } else {
        volumeSlider.value = volumeValue;
        updateVolume(volumeValue);
        isMute = false;
    }
});





async function loadAudio(audio) {
    try {
        Audio.src = `../../../assets/music/${audio.title}.mp3`;
        Audio.load();
    } catch (error) {}


    title.textContent = audio.title;
    artist.textContent = audio.artist;
    thumbnail.style.backgroundImage = `url(${ await loadImage(audio)})`;

    audioSlider.setAttribute('max', audio.duration);
    currentTime.textContent = '0:00';
    duration.textContent = buildDuration(audio.duration);

    currentAudio = audio;
    currentInteraction = await getInteraction(audio.id, 1);

    console.log("interaction: ", currentInteraction);

    await loadOverlay(audio);
}

async function loadOverlay(audio) {
    const overlayTitle = document.querySelector('.overlay-title');
    const overlayArtist = document.querySelector('.overlay-artist');
    const overlayThumbnail = document.querySelector('.overlay-thumbnail');

    overlayTitle.textContent = audio.title;
    overlayArtist.textContent = audio.artist;
    overlayThumbnail.style.backgroundImage = `url(${ await loadImage(audio)})`;

    console.log("audioList: ", audioList);
    console.log("audioIndex: ", audioIndex);
    console.log('music', audioList[audioIndex]);


    const list = audioList.slice();
    const currentIndex = audioIndex;
    
    const Audio = list.splice(currentIndex, 1)[0];
    const beforeAudio = list.splice(0, currentIndex);
    list.unshift(Audio);    
    list.push(...beforeAudio);

    await loadPlaylist(list);
}

async function loadPlaylist(audioList) {
    const playlist = document.querySelector('.playlist');
    playlist.innerHTML = '';
    for(let i=1; i<audioList.length; i++) {
        const music = document.createElement('div');
        music.classList.add('playlist-music');

        music.innerHTML = `
            <div class="playlist-music-details">
                <div class="playlist-music-thumbnail"></div>
                <div class="playlist-music-info">
                    <span class="playlist-music-title">${audioList[i].title}</span>
                    <span class="playlist-music-artist">${audioList[i].artist}</span>
                </div>
            </div>

            <div class="playlist-music-controls">
                <span class="material-symbols-outlined icon control">more_horiz</span>
                <span class="material-symbols-outlined icon control play">play_circle</span>
            </div>
        `;

        music.querySelector('.playlist-music-controls .play').addEventListener('click', async () => {
            audioIndex = audioIndex + i;
            console.log('audioIndex: ', audioIndex);
            await loadAudio(audioList[i]);
            audioPlay();
        });

        music.querySelector('.playlist-music-thumbnail').style.backgroundImage = `url(${ await loadImage(audioList[i])})`;

        playlist.appendChild(music);
    }
}


function buildDuration(duration) {
    let minutes = Math.floor(duration / 60);
    let reste = duration % 60;
    let secondes = Math.floor(reste);
    secondes = String(secondes).padStart(2, "0");
    return minutes + ":" + secondes;
}


function updateVolume(volumeValue) {
    volumeSlider.value = volumeValue;
    Audio.volume = volumeValue;
    setVolumeIcon(volumeValue);
}


function setVolumeIcon(volume) {
    if (volume < 0.01) {
        volumeIcon.textContent = 'volume_off';
    } else if (volume < 0.5) {
        volumeIcon.textContent = "volume_down";
    } else {
        volumeIcon.textContent = "volume_up";
    }
}




async function loadImage(track) {
    const artist = track.artist;
    const title = track.title;

    const imageName = `${artist} ${title}`.replace(/[^a-zA-Z0-9]/g, '_');
    let img = `${imagePath}/${imageName}.png`;

    try {
        const response = await fetch(img);

        if (!response.ok) {
            throw new Error('Image not found');
        }

        return img;
    } catch {
        return defaultImage;
    }
}


function nextAudio() {
    audioIndex++;
    if(audioIndex >= audioList.length) {
        audioIndex = 0;
    }

    loadAudio(audioList[audioIndex]);
    isPlaying ? Audio.play() : Audio.pause();
}


function previousAudio() {
    if(isRandom) {
        audioIndex = Math.floor(Math.random() * audioList.length);
    } else {
        audioIndex--;
        if(audioIndex < 0) {
            audioIndex = audioList.length - 1;
        }
    }

    loadAudio(audioList[audioIndex]);
    isPlaying ? Audio.play() : Audio.pause();
}


function audioPlay() {
    Audio.play();
    isPlaying = true;
    playPause.textContent = 'pause_circle';
}

function audioPause() {
    Audio.pause();
    isPlaying = false;
    playPause.textContent = 'play_circle';
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

async function likeMusic(musicId, userId) {
    try {
        const response = await fetch(`/api/music/like`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                musicId: musicId,
                userId: userId,
            })
        });

        const music = await response.json();
        return music;
    } catch (error) {
        return;
    }
};

async function getInteraction(musicId, userId) {
    try {
        const response = await fetch(`/api/music/interaction/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                musicId: musicId,
                userId: userId,
            })
        });
        const interaction = await response.json();
        return interaction;
    } catch (error) {
        return;
    }
}

function shuffleArray(array) {
    const audio = array[audioIndex];
    const shuffledArray = array.filter((item) => item !== audio);
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }

    shuffledArray.unshift(audio);
    console.log("array: ", shuffledArray);
    return shuffledArray;
}




