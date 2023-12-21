const { getAllDBMusic, getDBMusicById, deleteDBMusicById, addDBMusic, updateDBMusicById, updateDBMusic } = require('../config/music.db');
const ytdl = require('ytdl-core');
const fs = require('fs');




module.exports.getAllMusic = async (req, res) => {
    getAllDBMusic().then((result) => {
        if (result.length === 0) {
            res.status(500).send("aucune musique trouvée");
            return;
        }

        res.send(result);
        return;
    }).catch((error) => {
        res.status(500).send("erreur lors de la récupération de la musique : " + error.code);
        return;
    });
};

module.exports.getMusicById = async (req, res) => {
    const id = req.params.id;

    if (!id) {
        res.status(500).send("id manquant");
        return;
    }

    getDBMusicById(id).then((result) => {
        if (result.length === 0) {
            res.status(500).send("aucune musique trouvée avec cet id");
            return;
        }

        res.send(result);
        return;
    }).catch((error) => {
        res.status(500).send("erreur lors de la récupération de la musique (id): " + error.code);
        return;
    });
};


module.exports.deleteMusic = async (req, res) => {
    const id = req.params.id;

    if (!id) {
        res.status(500).send("id manquant");
        return;
    }

    deleteDBMusicById(id).then((result) => {
        res.send(result);
        return;
    }).catch((error) => {
        res.status(500).send("erreur lors de la suppression de la musique : " + error.code);
        return;
    });
};


module.exports.updateMusic = async (req, res) => {
    const id = req.params.id;
    const title = req.body.title;
    const artist = req.body.artist;
    const duration = req.body.duration;
    const url = req.body.url;
    const filePath = req.body.filePath;

    if (!id || !title || !artist || !duration || !url || !filePath) {
        res.status(500).send("pb params");
        return;
    }

    updateDBMusic(id, title, artist, duration, url, filePath).then((result) => {
        res.send(result);
        return;
    }).catch((error) => {
        res.status(500).send("erreur lors de la mise à jour de la musique : " + error.code);
        return;
    });
};

module.exports.downloadMusic = async (req, res) => {
    const url = req.body.url;
    const title = req.body.title;
    const artist = req.body.artist;

    const filePath = `assets/music/${title}.mp3`;
    
    const videoInfo = await ytdl.getInfo(url);
    const duration = videoInfo.player_response.videoDetails.lengthSeconds;

    if(!url || !title || !artist || !duration) {
        res.status(400).send("Bad request");
        return;
    }

    addDBMusic(title, artist, duration, url, filePath)
        .then((result) => {
            console.log("musique ajoutée à la base de données");
            const video = ytdl(url, { quality: 'highestaudio' });
            video.pipe(fs.createWriteStream(filePath));

            video.on('end', () => {
                console.log("Téléchargement terminé");
                res.send(result);
                return;
            });

            video.on('error', () => {
                res.send("erreur lors du téléchargement");
                return;
            })
        })
        .catch((error) => {
            if(error.code === 'ER_DUP_ENTRY') {
                res.status(500).send("cette musique est déjà dans la base de données");
                return;
            }

            res.status(500).send("erreur lors de l'ajout de la musique à la base de données : " + error);
            return;
        });
};



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



