module.exports = (connection, DataType) => {

    const TaskWeek = connection.define('tasksWeeks', {
        dom: {
            type: DataType.BOOLEAN,
            defaultValue: false
        },
        seg: {
            type: DataType.BOOLEAN,
            defaultValue: false
        },
        ter: {
            type: DataType.BOOLEAN,
            defaultValue: false
        },
        qua: {
            type: DataType.BOOLEAN,
            defaultValue: false
        },
        qui: {
            type: DataType.BOOLEAN,
            defaultValue: false
        },
        sex: {
            type: DataType.BOOLEAN,
            defaultValue: false
        },
        sab: {
            type: DataType.BOOLEAN,
            defaultValue: false
        },
        dom: {
            type: DataType.BOOLEAN,
            defaultValue: false
        },
        tasks_id: {
            type: DataType.INTEGER,
            allowNull: false
        }
    });

    TaskWeek.associate = models => {
        // TaskWeek pertence à Task
        TaskWeek.belongsTo(models.Task, { foreignKey: 'tasks_id', as: 'tasks' });
    }

    TaskWeek.sync({ force: false }).then(() => {
        console.log('tasksWeek table created.');
    });

    return TaskWeek;
};