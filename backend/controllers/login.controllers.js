const bcrypt = require('bcrypt');

const saltRounds = 10;

const cryptedPassword = async (password) => {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    return hash;
};

const validetaPassword = async (password, hash) => {
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

    const hash = await cryptedPassword(password);
    console.log("hash : ", hash);

    const valide = await validetaPassword(username, hash);
    console.log("valide : ", valide);
    
    res.status(200);

};



