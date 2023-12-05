const { addMusicInDB, isMusicInDB } = require('../config/db');
const ytdl = require('ytdl-core');
const fs = require('fs');
let mysql = require('mysql');

module.exports.downloadMusic = async (req, res) => {
    console.log("req.body : ", req.body);

    const url = req.body.url;
    const title = req.body.title;
    const artist = req.body.artist;
    const filePath = `assets/music/${title}.mp3`;

    isMusicInDB(url).then((result) => {
        console.log("result : ", result);
    });

    res.send("musique ajoutée à la base de données");

    const videoInfo = await ytdl.getInfo(url);
    const duration = videoInfo.player_response.videoDetails.lengthSeconds;

    const video = ytdl(url, { quality: 'highestaudio' });
    video.pipe(fs.createWriteStream(filePath));
    video.on('end', () => {
        // console.log("Téléchargement terminé");
        // addMusicInDB(title, artist, musicDuration(duration), url, filePath).then(() => {
        //     res.send("musique ajoutée à la base de données");
        // }).catch((error) => {
        //     res.send("erreur lors de l'ajout de la musique à la base de données");
        // });
    });
}



function musicDuration (ms) {
    let minutes = Math.floor(ms / 60000);
    let seconds = ((ms % 60000) / 1000).toFixed(0);
    minutes = String(minutes).padStart(2, '0');
    seconds = String(seconds).padStart(2, '0');
    return `${minutes}:${seconds}`;
}