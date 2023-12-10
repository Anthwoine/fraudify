const { getMusicFromDBById, getMusicFromDBByUrl, getMusicFromDBByArtist, getMusicFromDBByTitle, getAllMusicFromDB } = require('../config/db');






module.exports.getAllMusicFromDB = async (req, res) => {
    getAllMusicFromDB().then((result) => {
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


module.exports.getMusicFromDBById = async (req, res) => {
    if (!req.params.id) {
        res.status(500).send("id manquant");
        return;
    }

    getMusicFromDBById(req.params.id).then((result) => {
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


module.exports.deleteMusicFromDB = async (req, res) => {
    if (!req.params.id) {
        res.status(500).send("id manquant");
        return;
    }

    getMusicFromDBById(req.params.id).then((result) => {
        if (result.length === 0) {
            res.status(500).send("aucune musique trouvée avec cet id");
            return;
        }

        deleteMusicFromDBById(req.params.id).then((result) => {
            res.send(result);
            return;
        }).catch((error) => {
            res.status(500).send("erreur lors de la suppression de la musique : " + error.code);
            return;
        });
    }).catch((error) => {
        res.status(500).send("erreur lors de la récupération de la musique : " + error.code);
        return;
    });
};


module.exports.updateMusicFromDB = async (req, res) => {
    const params = !req.params.id || !req.body.title || !req.body.artist || !req.body.duration || !req.body.url || !req.body.filePath;
    if (params) {
        res.status(500).send("id manquant");
        return;
    }

    getMusicFromDBById(req.params.id).then((result) => {
        if (result.length === 0) {
            res.status(500).send("aucune musique trouvée avec cet id");
            return;
        }

        updateMusicFromDB(req.params.id, req.body.title, req.body.artist, req.body.duration, req.body.url, req.body.filePath).then((result) => {
            res.send(result);
            return;
        }).catch((error) => {
            res.status(500).send("erreur lors de la mise à jour de la musique : " + error.code);
            return;
        });
    }).catch((error) => {
        res.status(500).send("erreur lors de la récupération de la musique : " + error.code);
        return;
    });
};



