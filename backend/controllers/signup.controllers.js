const bcrypt = require('bcrypt');
const { addUserInDB } = require('../config/db');

const saltRounds = 10;

module.exports.signupUser = async (req, res) => {
    if(!req.body.username || !req.body.password || !req.body.email) {
        res.status(400).send('Bad request avec un champ manquant');
        return;
    }

    const salt = await bcrypt.genSalt(saltRounds);

    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;

    const hash = await bcrypt.hash(password, salt);

    addUserInDB(username, hash, email)
        .then((result) => {
            console.log("result: ", result);
            res.status(200).send("utilisateur ajouté");
            return;
        })
        .catch((error) => {
            if(error.code === "ER_DUP_ENTRY") {
                res.status(500).send("l'utilisateur existe déjà");
                return;
            }
            
            res.status(500).send("erreur lors de l'ajout de l'utilisateur : " + error.code);
            return;
        }
    );
};