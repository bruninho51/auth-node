module.exports = function(app) {
    
    const Sequelize = require('sequelize')
    const connection = app.database.connection

    const Level = connection.define('levels', {
        level: {
            type: Sequelize.STRING,
            allowNull: false
        }
    })

    Level.sync({ force: false }).then(() => {
        console.log('levels table created.')
    })

    return Level
}