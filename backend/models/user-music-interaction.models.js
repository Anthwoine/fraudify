const sequelizeConfig = require('../config/db.config');
const { Sequelize } = require('sequelize');

const userMusicInteractionSchema = sequelizeConfig.define('user-music-interaction', {
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

    musicId: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },

    liked: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
    },

    timesListened: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
    },
});

const userSchema = require('./user.models');
const musicSchema = require('./music.models');

userMusicInteractionSchema.belongsTo(userSchema, { foreignKey: 'userId', onDelete: 'CASCADE' });
userMusicInteractionSchema.belongsTo(musicSchema, { foreignKey: 'musicId', onDelete: 'CASCADE' });

sequelizeConfig.sync();

module.exports = sequelizeConfig.model('user-music-interaction', userMusicInteractionSchema);