const express = require('express');
const path = require('path');


const port = 5000;

const app = express();


//définition des middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


//définition des dossiers statiques
app.use(express.static(path.join(__dirname, '../client')));
app.use('/assets', express.static(path.join(__dirname, '../assets')));
app.use('/js/scripts.js', express.static(path.join(__dirname, '../client/js/scripts.js')));


//autoriser les requêtes cross-origin
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});




//définition des routes
app.use('/download', require('./routes/download.routes'));

app.use('/image', require('./routes/image.routes'));

app.use('/music', require('./routes/music.routes'));



//route 404
app.use((req, res, next) => {
    //res.status(404).redirect('404.html');
    next();
});

//lancer le serveur
app.listen(port, () => console.log("Le serveur a démarré au port : " + port));