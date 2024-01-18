const express = require('express');
const path = require('path');
const music = require('./controllers/music.controllers');
const authentification = require('./middlewares/authentification.middleware');


const port = 5000;
const app = express();

//définition des middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//définition des dossiers statiques
app.use(express.static(path.join(__dirname, '../client')));
app.use('/assets', express.static(path.join(__dirname, '../assets')));
app.use('/js/scripts.js', express.static(path.join(__dirname, '../client/js/scripts.js')));


//définition des routes
app.use('/api/music', require('./routes/music.routes'));
app.use('/api/user', require('./routes/user.routes'));




//route 404
app.all('*', (req, res) => { 
    res.status(404).send('<h1>404! Page not found</h1>'); 
}); 

//lancer le serveur
app.listen(port, () => console.log("Le serveur a démarré au port : " + port));