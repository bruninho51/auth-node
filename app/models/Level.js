module.exports = (connection, DataType) => {    

    const Level = connection.define('levels', {
        level: {
            type: DataType.STRING,
            allowNull: false
        }
    });

    Level.sync({ force: false }).then(() => {
        console.log('levels table created.');
    });

    return Level;
};