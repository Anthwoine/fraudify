const client = require('./db');

module.exports.getAllDBMusic = async () => {
    return new Promise((resolve, reject) => {
        let selectQuery = "SELECT * FROM music";
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
}

module.exports.getDBMusicById = async (id) => {
    return new Promise((resolve, reject) => {
        let selectQuery = "SELECT * FROM music WHERE id = ?";
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

}

module.exports.getDBMusicById = async (id) => {
    return new Promise((resolve, reject) => {
        let selectQuery = "SELECT * FROM music WHERE id = ?";
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
}

module.exports.deleteDBMusic = async (id) => {
    return new Promise((resolve, reject) => {
        let deleteQuery = "DELETE FROM music WHERE id = ?";
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
}

module.exports.addDBMusic = async (title, artist, duration, url, filePath) => {
    return new Promise((resolve, reject) => {
        let insertQuery = "INSERT INTO music (title, artist, duration, url, path) VALUES (?, ?, ?, ?, ?)";
        client.query(
            insertQuery,
            [title, artist, duration, url, filePath],
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
}

module.exports.updateDBMusic = async (id, title, artist, duration, url, filePath) => {
    return new Promise((resolve, reject) => {
        let updateQuery = "UPDATE music SET title = ?, artist = ?, duration = ?, url = ?, path = ? WHERE id = ?";
        client.query(
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
}