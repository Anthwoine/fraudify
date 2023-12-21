const { getAllDBMusic, getDBMusicById, deleteDBMusicById, addDBMusicById, updateDBMusicById, updateDBMusic } = require('../config/music.db');





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



