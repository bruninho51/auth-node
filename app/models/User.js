module.exports = function(app) {
    
    const Sequelize = require('sequelize')
    const connection = app.database.connection

    const User = connection.define('users', {
        email: {
            type: Sequelize.STRING,
            allowNull: false
        },
        pwd: {
            type: Sequelize.STRING,
            allowNull: false
        },
        pwd: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    })

    User.sync({ force: false }).then(() => {
        console.log('users table created.')
    })

    return User
}