require('dotenv').config();
let mysql = require('mysql');


// local mysql db connection
let mySqlClient = mysql.createConnection({
    host: "localhost",
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    database: process.env.SQL_DATABASE 
});



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



module.exports.getMusicFromDBByUrl = async (url) => {
    return new Promise((resolve, reject) => {
        let selectQuery = "SELECT * FROM music WHERE url = ?";
        mySqlClient.query(
            selectQuery,
            [url],
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



module.exports.getMusicFromDBByTitle = async (title) => {
    return new Promises((resolve, reject) => {
        let selectQuery = "SELECT * FROM music WHERE title = ?";
        mySqlClient.query(
            selectQuery,
            [title],
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



module.exports.getMusicFromDBByArtist = async (artist) => {
    return new Promise((resolve, reject) => {
        let selectQuery = "SELECT * FROM music WHERE artist = ?";
        mySqlClient.query(
            selectQuery,
            [artist],
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