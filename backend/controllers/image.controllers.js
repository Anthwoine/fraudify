

module.exports.getMusicImg = async (req, res) => {
    if (!req.body.artist || !req.body.title) {
        res.status(500).send("paramètres manquants");
        return;
    }

    const artist = req.body.artist;
    const title = req.body.title;

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

        if (data.track && data.track.album) {
            const images = data.track.album.image;
            const img = images.length > 0 ? images[images.length - 1]['#text'] : null;

            if (img) {
                res.send({img : img});
                return;
            }
        }

        res.status(404).send("Image non trouvée");
    } catch (error) {
        console.error("Erreur:", error);
        res.status(500).send("Une erreur s'est produite");
    }
};