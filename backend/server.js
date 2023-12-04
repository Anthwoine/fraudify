const express = require('express');
const ytdl = require('ytdl-core');
const axios = require('axios');
const fs = require('fs');

const request = require('./config/db');
request();

const port = 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));



app.use('/download', require('./routes/download.routes'));



//lancer le serveur
app.listen(port, () => console.log("Le serveur a démarré au port : " + port));