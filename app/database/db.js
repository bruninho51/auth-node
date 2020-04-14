const fs = require('fs');
const path = require('path');
const DataType = require('sequelize');

let db = null;

module.exports = function (app) {
    if (!db) {
        const connection = app.database.connection;
        db = {
            connection,
            DataType,
            models: {}
        }
        const dir = path.join(__dirname, '..', 'models');
        fs.readdirSync(dir).forEach(file => {
            const modelDir = path.join(dir, file);
            const model = connection.import(modelDir);
            db.models[path.basename(file, '.js')] = model;
        });
        Object.keys(db.models).forEach(key => {
            if (db.models[key].hasOwnProperty('associate')) {
                db.models[key].associate(db.models);
            }
        });
    }

    return db;
}