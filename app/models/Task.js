module.exports = (connection, DataType) => {
    
    const Task = connection.define('tasks', {
        name: {
            type: DataType.STRING,
            allowNull: false
        },
        description: {
            type: DataType.TEXT,
            allowNull: true
        },
        score: {
            type: DataType.INTEGER,
            allowNull: false
        },
        minimumAge: {
            type: DataType.INTEGER,
            allowNull: true
        },
        users_id: {
            type: DataType.INTEGER,
            allowNull: false
        }
    });

    Task.associate = models => {
        Task.hasOne(models.TaskWeek, { foreignKey: 'tasks_id', key: 'id', as: 'tasksWeeks' });
    }

    Task.sync({ force: false }).then(() => {
        console.log('tasks table created.');
    });

    return Task;
};