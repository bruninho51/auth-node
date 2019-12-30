module.exports = function(app) {
    const Sequelize = require('sequelize')
    const connection = app.database.connection
    
    const Task = connection.define('tasks', {
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        description: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        score: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        minimumAge: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        users_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    })

    Task.sync({ force: false }).then(() => {
        console.log('tasks table created.')
    })

    return Task
}