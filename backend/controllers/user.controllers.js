const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

const { getAllDBUser, getDBUserByUsername, addDBUser, updateDBUserById } = require("../config/user.db");

const saltRounds = 10;




module.exports.getAllUser = async (req, res) => {
    getAllDBUser().then((result) => {
        res.send(result);
        return;
    }).catch((error) => {
        res.status(500).send("erreur lors de la récupération de l'utilisateur : " + error.code);
        return;
    });
};



module.exports.getUserByUsername = async (req, res) => {
    const id = req.body.id;

    if (!id) {
        res.status(500).send("id manquant");
        return;
    }

    getDBUserById(id).then((result) => {
        res.send(result);
        return;
    }).catch((error) => {
        res.status(500).send("erreur lors de la récupération de l'utilisateur (id): " + error.code);
        return;
    });
};



module.exports.addUser = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;

    if(!username || !password || !email) {
        res.status(400).send('pb body params');
        return;
    }

    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);

    addDBUser(username, hash, email)
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



module.exports.updateUser = async (req, res) => {
    const id = req.body.id;
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;

    if(!id || !username || !password || !email) {
        res.status(400).send('pb body params');
        return;
    }

    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);

    updateDBUserById(id, username, hash, email)
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



module.exports.deleteUser = async (req, res) => {
    res.send('TODO deleteUser');
};



module.exports.login = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if(!username || !password) {
        res.status(400).send('pb body params');
        return;
    }

    getDBUserByUsername(username)
        .then(async (result) => {
            console.log("result : ", result);

            if(result.length === 0) {
                console.log("utilisateur non trouvé");
                res.status(500).send({message: "utilisateur non trouvé"});
                return;
            }
            
            console.log("result[0] : ", result[0])

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




const validatePassword = async (password, hash) => {
    const res = await bcrypt.compare(password, hash);
    return res;
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