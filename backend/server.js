const express = require('express');
const ytdl = require('ytdl-core');
const axios = require('axios');
const path = require('path');
const fs = require('fs');

const port = 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, '../client')));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use('/download', require('./routes/download.routes'));
app.use('/music', require('./routes/music.routes'));
app.use('/music/title', require('./routes/music.routes'));



//lancer le serveur
app.listen(port, () => console.log("Le serveur a démarré au port : " + port));