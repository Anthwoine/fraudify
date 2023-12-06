const { get } = require('mongoose');
const { getMusicFromDBById, getMusicFromDBByUrl, getMusicFromDBByArtist, getMusicFromDBByTitle, getAllMusicFromDB } = require('../config/db');

module.exports.getMusicFromDBById = async (req, res) => {
    if(!req.params.id) {
        res.status(500).send("id manquant");
        return;
    }

    getMusicFromDBById(req.params.id).then((result) => {
        if(result.length === 0) {
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

module.exports.getMusicFromDBByUrl = async (req, res) => {
    if(!req.params.url) {
        res.status(500).send("url manquant");
        return;
    }

    getMusicFromDBByUrl(req.params.url).then((result) => {
        if(result.length === 0) {
            res.status(500).send("aucune musique trouvée avec cet url");
            return;
        }

        res.send(result);
        return;
    }).catch((error) => {
        res.status(500).send("erreur lors de la récupération de la musique (url): " + error.code);
        return;
    });
};

module.exports.getMusicFromDBByTitle = async (req, res) => {
    if(!req.params.title) {
        res.status(500).send("title manquant");
        return;
    }

    getMusicFromDBByTitle(req.params.title).then((result) => {
        if(result.length === 0) {
            res.status(500).send("aucune musique trouvée avec ce titre");
            return;
        }

        res.send(result);
        return;
    }).catch((error) => {
        res.status(500).send("erreur lors de la récupération de la musique (title): " + error.code);
        return;
    });
};

module.exports.getMusicFromDBByArtist = async (req, res) => {
    if(!req.params.artist) {
        res.status(500).send("artist manquant");
        return;
    }

    getMusicFromDBByArtist(req.params.artist).then((result) => {
        if(result.length === 0) {
            res.status(500).send("aucune musique trouvée avec cet artist");
            return;
        }

        res.send(result);
        return;
    }).catch((error) => {
        res.status(500).send("erreur lors de la récupération de la musique : " + error.code);
        return;
    });
};

module.exports.getAllMusicFromDB = async (req, res) => {
    getAllMusicFromDB().then((result) => {
        if(result.length === 0) {
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
