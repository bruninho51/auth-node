const Sequelize = require('sequelize');
const config = require('../database/config')

const env = process.env.NODE_ENV == undefined ? 
                'development' : process.env.NODE_ENV;

console.log(`running on ${env} environment`);

const configConn = config[env];

const connection = new Sequelize(
    configConn.database, 
    configConn.username, 
    configConn.password, 
    {
        host: configConn.host,
        dialect: configConn.dialect
    }
);

module.exports = connection;