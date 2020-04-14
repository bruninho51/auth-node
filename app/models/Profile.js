module.exports = (connection, DataType) => {

    const Profile = connection.define('profiles', {
        nickname: {
            type: DataType.STRING,
            allowNull: false
        },
        pwd: {
            type: DataType.STRING,
            allowNull: false
        },
        dateOfBird: {
            type: DataType.DATE,
            allowNull: false
        },
        score: {
            type: DataType.INTEGER,
            defaultValue: 0
        },
        users_id: {
            type: DataType.INTEGER,
            allowNull: false
        }
    });

    Profile.sync({ force: false }).then(() => {
        console.log('profiles table created.');
    });

    return Profile;
};