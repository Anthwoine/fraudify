const { addMusicInDB } = require('../config/db');
const ytdl = require('ytdl-core');
const fs = require('fs');

module.exports.downloadMusic = async (req, res) => {
    console.log("req.body : ", req.body);

    const url = req.body.url;
    const title = req.body.title;
    const artist = req.body.artist;
    const filePath = `assets/music/${title}.mp3`;

    const videoInfo = await ytdl.getInfo(url);
    const duration = videoInfo.player_response.videoDetails.lengthSeconds;

    const video = ytdl(url, { quality: 'highestaudio' });
    video.pipe(fs.createWriteStream(filePath));
    video.on('end', () => {
        console.log("Téléchargement terminé");
        addMusicInDB(title, artist, duration, url, filePath).then((result) => {
            console.log("musique ajoutée à la base de données");
            res.send(result);
            return;
        }).catch((error) => {
            if(error.code === 'ER_DUP_ENTRY') {
                res.status(500).send("cette musique est déjà dans la base de données");
                return;
            }

            res.status(500).send("erreur lors de l'ajout de la musique à la base de données : " + error.code);
            return;
        });
    });
}

module.exports.getMusicInfo = async (req, res) => {
    const url = req.body.url;
    ytdl.getInfo(url).then((videoInfo) => {
        const duration = videoInfo.player_response.videoDetails.lengthSeconds;
        const title = videoInfo.player_response.videoDetails.title;
        const response = {
            title: title,
            duration: duration + " secondes"
        }
        res.send(response);
        return;
    }).catch((error) => {
        res.status(500).send("erreur lors de la récupération des informations de la musique : " + error);
        return;
    });
};



function buildDuration(duration) {
    let minutes = Math.floor(duration / 60);
    let reste = duration % 60;
    let secondes = Math.floor(reste);
    secondes = String(secondes).padStart(2, "0");
    return minutes + ":" + secondes;
}