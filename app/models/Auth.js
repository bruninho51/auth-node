module.exports = function(app) {
    
    const Sequelize = require('sequelize')
    const connection = app.database.connection
    
    const Auth = connection.define('auth', {
        hash: {
            type: Sequelize.STRING,
            allowNull: false
        },
        active: {
            type: Sequelize.BOOLEAN,
            allowNull: false
        }
    }, { freezeTableName: true })
    
    Auth.sync({ force: false }).then(() => {
        console.log('auth table created.')
    })

    return Auth
}
