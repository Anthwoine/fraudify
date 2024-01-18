require('dotenv').config();
const { Sequelize } = require('sequelize');


dbConfig = {
    HOST: process.env.SQL_HOST,
    USER: process.env.SQL_USER,
    PASSWORD: process.env.SQL_PASSWORD,
    DB: process.env.SQL_DATABASE,
    dialect: "mysql" || "mariadb",
};

module.exports = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    define: {
        timestamps: true,
        createdAt: false,
        updatedAt: false,
    }
});

// local mysql db connection
// let mySqlClient = mysql.createConnection({
//     host: process.env.SQL_HOST,
//     user: process.env.SQL_USER,
//     password: process.env.SQL_PASSWORD,
//     database: process.env.SQL_DATABASE
// });

// module.exports = mySqlClient;





























// module.exports.addUserInDB = async (username, password, email) => {
//     return new Promise((resolve, reject) => {
//         let insertQuery = "INSERT INTO user (username, password, email) VALUES (?, ?, ?)";
//         mySqlClient.query(
//             insertQuery,
//             [username, password, email],
//             function (error, result) {
//                 if (error) {
//                     reject(error);
//                     return;
//                 }

//                 resolve(result);
//                 return;
//             }
//         )
//     });
// };

// module.exports.getUserFromDBByUsername = async (username) => {
//     return new Promise((resolve, reject) => {
//         let selectQuery = "SELECT u.username, u.password FROM user as u WHERE username = ?";
//         mySqlClient.query(
//             selectQuery,
//             [username],
//             function (error, result) {
//                 if (error) {
//                     console.log("error : ", error);
//                     reject(error);
//                     return;
//                 }

//                 resolve(result);
//                 return;
//             }
//         )
//     });
// };