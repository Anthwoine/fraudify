const sequelizeConfig = require('../config/db.config');
const { Sequelize } = require('sequelize');

const playlistSchema = sequelizeConfig.define('playlist', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },

    userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'New Playlist',
    },

    description: {
        type: Sequelize.STRING,
        allowNull: true,
    },

    thumbnail: {
        type: Sequelize.STRING,
        allowNull: true,
    },

    visibility: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
});  

const userSchema = require('./user.models');

playlistSchema.belongsTo(userSchema, { foreignKey: 'userId', onDelete: 'CASCADE' });

sequelizeConfig.sync();

module.exports = sequelizeConfig.model('playlist', playlistSchema);