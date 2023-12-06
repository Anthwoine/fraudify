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

module.exports.isMusicInDB = async (url) => {
    let selectQuery = "SELECT * FROM music WHERE url = ?";
    mySqlClient.query(
        selectQuery,
        [url],
        async function (error, result) {
            if (error) {
                console.log("Error : ", error.sqlMessage);
                mySqlClient.end();
                return;
            }
            return await result;
        }
    )
};

