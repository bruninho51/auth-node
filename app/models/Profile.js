module.exports = function(app) {
    
    const Sequelize = require('sequelize');
    const connection = app.database.connection;

    const Profile = connection.define('profiles', {
        nickname: {
            type: Sequelize.STRING,
            allowNull: false
        },
        pwd: {
            type: Sequelize.STRING,
            allowNull: false
        },
        dateOfBird: {
            type: Sequelize.DATE,
            allowNull: false
        },
        score: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        users_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    });

    Profile.sync({ force: false }).then(() => {
        console.log('profiles table created.');
    });

    return Profile;
};