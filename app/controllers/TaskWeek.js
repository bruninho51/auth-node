const { validationResult } = require('express-validator');

module.exports = function(app) {
    const authorization = app.moddlewares.authorization;

    app.get('/task/week', [authorization], function(req, res) {
        const Task = app.database.db.models.Task;
        Task.findAll({
            include: 'tasksWeeks'
        }).then((data) => {
            res.status(200).send(data);
        });
    });
}