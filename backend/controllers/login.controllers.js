const bcrypt = require('bcrypt');
const { getUserFromDBByUsername } = require('../config/db');
const { validateID } = require('ytdl-core');

const saltRounds = 10;

const cryptedPassword = async (password) => {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    return hash;
};

const validatePassword = async (password, hash) => {
    const res = await bcrypt.compare(password, hash);
    return res;
};

module.exports.login = async (req, res) => {
    if(!req.body.username || !req.body.password) {
        res.status(400).send('Bad request');
        return;
    }

    const username = req.body.username;
    const password = req.body.password;

    getUserFromDBByUsername(username)
        .then(async (result) => {
            console.log("result : ", result);

            if(result.length === 0) {
                res.status(500).send("utilisateur non trouvé");
                return;
            }
        
            if(await validatePassword(password, result[0].password)) {
                res.status(200).send("utilisateur connecté");
                return;
            } else {
                res.status(500).send("mdp incorrect");
                return;
            }

        }).catch((error) => {
            res.status(500).send("erreur lors de la connexion de l'utilisateur : " + error.code);
        });   
};



