module.exports = (connection, DataType) => {
    
    const Auth = connection.define('auth', {
        hash: {
            type: DataType.STRING,
            allowNull: false
        },
        clientTable: {
            type: DataType.STRING,
            allowNull: false
        },
        clientId: {
            type: DataType.INTEGER,
            allowNull: false
        },
        active: {
            type: DataType.BOOLEAN,
            allowNull: false
        }
    }, { freezeTableName: true });
    
    Auth.sync({ force: false }).then(() => {
        console.log('auth table created.');
    });

    return Auth;
};
