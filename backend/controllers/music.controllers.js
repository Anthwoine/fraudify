const { getAllDBMusic, getDBMusicById, deleteDBMusicById, addDBMusic, updateDBMusicById, updateDBMusic } = require('../config/music.db');
const ytdl = require('ytdl-core');
const fs = require('fs');
const path = require('path');




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
                fetchImage(title, artist, true);
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
    ytdl.getInfo(url).then(async (videoInfo) => {
        const duration = videoInfo.player_response.videoDetails.lengthSeconds;
        const title = videoInfo.player_response.videoDetails.title;
        const author = videoInfo.player_response.videoDetails.author;

        
        const image = await fetchImage(title, author, false);        
        const response = {
            title: title,
            artist: author,
            duration: duration,
            image: image
        }
        res.json(response);
        return;
    }).catch((error) => {
        res.status(500).send("erreur lors de la récupération des informations de la musique : " + error);
        return;
    });
};

module.exports.getMusicImg = async (req, res) => {
    const title = req.params.title;
    const artist = req.params.artist;

    if(!title || !artist) {
        res.status(500).send("paramètres manquants");
        return;
    }

    const img = await fetchImage(title, artist, false);
    console.log("img: (getMusicImg)", img);
    if(!img) {
        res.status(500).send("image non trouvée");
        return;
    }

    res.json({ image: img });
    return;
};

const downloadImage = async (imageUrl, title, artist) => {
    const downloadPath = `../../assets/images`;
    const imageName = `${artist} ${title}`.replace(/[^a-zA-Z0-9]/g, '_');

     try {
        const response = await fetch(imageUrl);
        const buffer = Buffer.from(await response.arrayBuffer());

        const extension = path.extname(imageUrl);

        const imagePath = path.join(__dirname, downloadPath, imageName + extension)
        
        fs.writeFileSync(imagePath, buffer);
        console.log("image téléchargée");
     } catch (error) {
        console.error('Erreur lors du téléchargement de l\'image:', error.message);
      }
}   




async function fetchImage(title, artist, download) {
    try {
        const url = new URL('http://ws.audioscrobbler.com/2.0/');
        const api_key = process.env.FM_API_KEY;
        const params = {
            method: 'track.getInfo',
            artist: artist,
            track: title,
            api_key: api_key,
            format: 'json',
        }

        url.search = new URLSearchParams(params).toString();
        const response = await fetch(url.toString());
        const data = await response.json();

        console.log("data: ", data);

        if(data.track && data.track.album) {
            const images = data.track.album.image;
            const img = images.length > 0 ? images[images.length - 1]['#text'] : null;
            
            if(img && download) {
                console.log("image trouvée download...");
                console.log(img);
                downloadImage(img, title, artist);
            } else if(img){
                console.log("image trouvée");
                console.log(img);
                return img;
            } else {
                console.log("image non trouvée");
                return null;
            }
        } else {
            console.log("image non trouvée");
            return null;
        }
    } catch (error) {
        console.error("Erreur:", error);
        res.status(500).send("Une erreur s'est produite");
    }
}
