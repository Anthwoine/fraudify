require('dotenv').config();
let mysql = require('mysql');


// local mysql db connection
let mySqlClient = mysql.createConnection({
    host: "localhost",
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    database: process.env.SQL_DATABASE 
});



const request = () => {
    let selectQuery = "DESCRIBE music";
    mySqlClient.query(
        selectQuery,
        function (error, result, fields) {
            if (error) {
                console.log("Error: ", error);
                mySqlClient.end();
            }

            if(result.length > 0) {
                console.log("Results : \n\n", result);
            } else {
                console.log("No results found");
            }
            mySqlClient.end();
        }
    )
}

module.exports.addMusicInDB = async (title, artist, duration, url, filePath) => {
    let insertQuery = "INSERT INTO music (title, artist, duration, url, path) VALUES (?, ?, ?, ?, ?)";
    mySqlClient.query(
        insertQuery,
        [title, artist, duration, url, filePath],
        function (error, result) {
            if (error) {
                console.log("Error : ", error);
                mySqlClient.end();
            }
            console.log("Results : ", result);
            mySqlClient.end();
        }
    )
};

module.exports.isMusicInDB = async (url) => {
    let selectQuery = "SELECT * FROM music WHERE url = ?";
    mySqlClient.query(
        selectQuery,
        [url],
        async function (error, result) {
            if (error) {
                console.log("Error : ", error);
                mySqlClient.end();
            }
            return await result;
        }
    )
};

