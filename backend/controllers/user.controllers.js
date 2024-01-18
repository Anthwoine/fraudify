const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

const User = require('../models/user.models');

const saltRounds = 10;




module.exports.getAllUser = async (req, res) => {
    User.findAll()
        .then(user => res.status(200).json(user))
        .catch(error => res.status(500).json(error));
};



module.exports.getUserById = async (req, res) => {
    const id = req.body.id;

    if (!id) {
        res.status(500).send("id manquant");
        return;
    }

    User.findByPk(id)
        .then((user) => {
            if (!user) {
                res.status(404).send("aucun utilisateur trouvé avec cet id");
                return;
            }

            res.status(200).json(user);
        })
        .catch((error) => {
            res.status(500).send("erreur lors de la récupération de l'utilisateur (id): " + error);
        });
};



module.exports.addUser = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;


    if(!username || !password || !email) {
        res.status(400).send('pb body params');
        return;
    }

    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);

    const user = User.build({
        username: username,
        password: hash,
    });

    user.save()
        .then(() => res.status(200).send("utilisateur ajouté"))
        .catch((error) => res.status(500).send("erreur lors de l'ajout de l'utilisateur : " + error));
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

    const user = User.build({
        id: id,
        username: username,
        password: hash,
    });

    User.save(user.dataValues, { where: { id: id } })
        .then(() => res.status(200).send("utilisateur modifié"))
        .catch((error) => res.status(500).send("erreur lors de la modification de l'utilisateur : " + error));
};



module.exports.deleteUser = async (req, res) => {
    const id = req.params.id;

    if (!id) {
        res.status(500).send("id manquant");
        return;
    }

    User.destroy({ where: { id: id } })
        .then(() => res.status(200).send("utilisateur supprimé"))
        .catch((error) => res.status(500).send("erreur lors de la suppression de l'utilisateur (id): " + error));
};



module.exports.login = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    if(!email || !password) {
        res.status(400).send('pb body params');
        return;
    }

    User.findOne({ where: { email: email } })
        .then(async (user) => {
            if(!user) {
                res.status(404).send("aucun utilisateur trouvé avec cet email");
                return;
            }

            if(await validatePassword(password, user.password)) {
                const token = getJWT(user);
                res.status(200).send({access_token : token});
                return;
            } else {
                res.status(500).send("mdp incorrect");
                return;
            }
        })
        .catch((error) => {
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