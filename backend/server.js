const express = require('express');
const ytdl = require('ytdl-core');
const axios = require('axios');
const fs = require('fs');

const port = 5000;

const app = express();

app.get('/post', (req, res) => {
    res.json({
        message: "Voici un message de l'API"
    });
});

const link = "https://www.youtube.com/watch?v=kagoEGKHZvU&list=PLFGcLQodWjBu1Ybi7PoNbyTLaRwvGtyLl&index=3";
app.get('/download', async (req, res) => {
    console.log("telechargement en cours");
    const video = ytdl(link, { quality: 'highestaudio' });
    const filePath = "assets/music/audio.mp3";

    let info = await ytdl.getInfo(link);
    let name = info.player_response.videoDetails.title;
    let duration = info.player_response.streamingData.formats[0].approxDurationMs;
    
    const response = {
        name: name,
        duration: duration
    }

    video.pipe(fs.createWriteStream(filePath));
    video.on('end', () => {
        console.log("Téléchargement terminé");
        res.send(response);
    });
});

//lancer le serveur
app.listen(port, () => console.log("Le serveur a démarré au port : " + port));