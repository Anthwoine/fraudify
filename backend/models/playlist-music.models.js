const sequelizeConfig = require('../config/db.config');
const { Sequelize } = require('sequelize');

const playlistMusicSchema = sequelizeConfig.define('playlist-music', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },

    playlistId: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },

    musicId: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
});

const playlistSchema = require('./playlist.models');
const musicSchema = require('./music.models');

playlistMusicSchema.belongsTo(playlistSchema, { foreignKey: 'playlistId', onDelete: 'CASCADE' });
playlistMusicSchema.belongsTo(musicSchema, { foreignKey: 'musicId', onDelete: 'CASCADE' });

sequelizeConfig.sync();

module.exports = sequelizeConfig.model('playlist-music', playlistMusicSchema);