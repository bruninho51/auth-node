module.exports = (connection, DataType) => {

    const User = connection.define('users', {
        email: {
            type: DataType.STRING,
            allowNull: false
        },
        pwd: {
            type: DataType.STRING,
            allowNull: false
        },
        pwd: {
            type: DataType.STRING,
            allowNull: false
        }
    });

    User.sync({ force: false }).then(() => {
        console.log('users table created.');
    });

    return User;
};