const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

module.exports = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1]; // Récupère le token dans le header => [Bearer, token]
    jwt.verify(token, process.env.JWT_SECRET, (err) => {
        if (err) {
            res.status(401).json({
                message : "le token à expiré"
            })
        }
        next();
    });
}