const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

const { getUserFromDBByUsername } = require('../config/db');




const saltRounds = 10;



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
            
            const user = result[0];
            if(await validatePassword(password, user.password)) {
                const token = getJWT(user);
                res.status(200).send({access_token : token});
                return;
            } else {
                res.status(500).send("mdp incorrect");
                return;
            }

        }).catch((error) => {
            res.status(500).send("erreur lors de la connexion de l'utilisateur : " + error);
        });   
};


const getJWT = (user) => {
    const payload = {
        id: user.id,
        username: user.username,
        role: user.role
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    return token; 
};



