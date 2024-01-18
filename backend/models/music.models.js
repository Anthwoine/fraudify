const sequelizeConfig = require("../config/db");
const Sequelize = require('sequelize');

const musicSchema = sequelizeConfig.define("music", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    
    title: {
        type: Sequelize.STRING,
        allowNull: false,
    },

    artist: {
        type: Sequelize.STRING,
        allowNull: false,
    },

    duration: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },

    url: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: {
            args: true,
            msg: 'this music is already in the database!'
        },
    },

    path: {
        type: Sequelize.STRING,
        allowNull: false,
    },
});

sequelizeConfig.sync();

module.exports = sequelizeConfig.model('music', musicSchema);
