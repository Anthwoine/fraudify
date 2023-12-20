require('dotenv').config();
let mysql = require('mysql');


// local mysql db connection
let mySqlClient = mysql.createConnection({
    host: process.env.SQL_HOST,
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    database: process.env.SQL_DATABASE
});

module.exports = mySqlClient;



module.exports.addMusicInDB = async (title, artist, duration, url, filePath) => {
    return new Promise((resolve, reject) => {
        let insertQuery = "INSERT INTO music (title, artist, duration, url, path) VALUES (?, ?, ?, ?, ?)";
        mySqlClient.query(
            insertQuery,
            [title, artist, duration, url, filePath],
            function (error, result) {
                if (error) {
                    reject(error);
                    return;
                }

                resolve(result);
                return;
            }
        )
    });
};



module.exports.getMusicFromDBById = async (id) => {
    return new Promise((resolve, reject) => {
        let selectQuery = "SELECT * FROM music WHERE id = ?";
        mySqlClient.query(
            selectQuery,
            [id],
            function (error, result) {
                if (error) {
                    console.log("error : ", error);
                    reject(error);
                    return;
                }

                resolve(result);
                return;
            }
        )
    });
};

module.exports.getAllMusicFromDB = async () => {
    return new Promise((resolve, reject) => {
        let selectQuery = "SELECT * FROM music";
        mySqlClient.query(
            selectQuery,
            function (error, result) {
                if (error) {
                    console.log("error : ", error);
                    reject(error);
                    return;
                }

                resolve(result);
                return;
            }
        )
    });
};

module.exports.deleteMusicFromDB = async (id) => {
    return new Promise((resolve, reject) => {
        let deleteQuery = "DELETE FROM music WHERE id = ?";
        mySqlClient.query(
            deleteQuery,
            [id],
            function (error, result) {
                if (error) {
                    console.log("error : ", error);
                    reject(error);
                    return;
                }

                resolve(result);
                return;
            }
        )
    });
};

module.exports.updateMusicFromDB = async (id, title, artist, duration, url, filePath) => {
    return new Promise((resolve, reject) => {
        let updateQuery = "UPDATE music SET title = ?, artist = ?, duration = ?, url = ?, path = ? WHERE id = ?";
        mySqlClient.query(
            updateQuery,
            [title, artist, duration, url, filePath, id],
            function (error, result) {
                if (error) {
                    console.log("error : ", error);
                    reject(error);
                    return;
                }

                resolve(result);
                return;
            }
        )
    });
};





module.exports.addUserInDB = async (username, password, email) => {
    return new Promise((resolve, reject) => {
        let insertQuery = "INSERT INTO user (username, password, email) VALUES (?, ?, ?)";
        mySqlClient.query(
            insertQuery,
            [username, password, email],
            function (error, result) {
                if (error) {
                    reject(error);
                    return;
                }

                resolve(result);
                return;
            }
        )
    });
};

module.exports.getUserFromDBByUsername = async (username) => {
    return new Promise((resolve, reject) => {
        let selectQuery = "SELECT u.username, u.password FROM user as u WHERE username = ?";
        mySqlClient.query(
            selectQuery,
            [username],
            function (error, result) {
                if (error) {
                    console.log("error : ", error);
                    reject(error);
                    return;
                }

                resolve(result);
                return;
            }
        )
    });
};