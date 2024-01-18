const sequelizeConfig = require("../config/db.config");
const Sequelize = require('sequelize');

const userSchema = sequelizeConfig.define("user", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },

    username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: {
            args: true,
            msg: 'Username already exists!'
        },
    },

    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },

    role: {
        type: Sequelize.STRING,
        enum : ['admin', 'user'],
        allowNull: false,
        defaultValue: 'user',
    },
});

sequelizeConfig.sync();

module.exports = sequelizeConfig.model('user', userSchema);