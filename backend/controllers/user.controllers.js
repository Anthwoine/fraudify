
module.exports.user = async (req, res) => {
    if(!req.params.id) {
        res.status(500).send("pas d'id");
        return;
    }
    res.send("id: " + req.params.id);
};

module.exports.users = async (req, res) => {
    res.send("users");
}

module.exports.signup = async (req, res) => {
    if(!req.body.username) {
        res.send("pas de username");
        return;
    }
    if(!req.body.password) {
        res.send("pas de password");
        return;
    }

    res.send("username: " + req.body.username + " password: " + req.body.password);
};