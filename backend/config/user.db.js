const client = require('./db');







module.exports.getAllDBUser = async () => {
    return new Promise((resolve, reject) => {
        let selectQuery = "SELECT * FROM user";
        client.query(
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



module.exports.getDBUserByUsername = async (id) => {
    return new Promise((resolve, reject) => {
        let selectQuery = "SELECT * FROM user WHERE username = ?";
        client.query(
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



module.exports.deleteDBUserById = async (id) => {
    return new Promise((resolve, reject) => {
        let deleteQuery = "DELETE FROM user WHERE id = ?";
        client.query(
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



module.exports.addDBUser = async (username, password, email) => {
    return new Promise((resolve, reject) => {
        let insertQuery = "INSERT INTO user (username, password, email) VALUES (?, ?, ?)";
        client.query(
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



module.exports.updateDBUserById = async (id, username, password, email) => {
    return new Promise((resolve, reject) => {
        let updateQuery = "UPDATE user SET username = ?, password = ?, email = ? WHERE id = ?";
        client.query(
            updateQuery,
            [username, password, email, id],
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