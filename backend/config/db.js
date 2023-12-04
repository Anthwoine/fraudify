let mysql = require('mysql');

// local mysql db connection
let mySqlClient = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "audioplayer_db" 
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

module.exports = request;