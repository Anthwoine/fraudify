const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; // Récupère le token dans le header
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET); // Décrypte le token
        next();

    } catch {
        res.status(401).json({
            error: "jwt ? where ?"
        });
    }
}