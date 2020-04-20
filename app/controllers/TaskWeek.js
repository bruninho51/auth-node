const { validationResult } = require('express-validator');

module.exports = function(app) {
    const taskWeekValidator = app.validators.taskWeek;
    const authorization = app.middlewares.authorization;

    app.post('/task/week', [authorization, taskWeekValidator], async function(req, res) {
        const TaskWeek = app.database.db.models.TaskWeek;

        let errors = await validationResult(req).array();
        if (errors.length > 0) {
            res.status(422).send({ errors: errors, message: 'Error validating as info' });
        } else {
            let exists = TaskWeek.findAll({
                where: {
                    tasks_id: req.body.tasks_id
                }
            });

            const data = {
                tasks_id: req.body.tasks_id,
                dom: req.body.dom,
                seg: req.body.seg,
                ter: req.body.ter,
                qua: req.body.qua,
                qui: req.body.qui,
                sex: req.body.sex,
                sab: req.body.sab
            };

            if (exists) {

                TaskWeek.update(data, { 
                    where: { 
                        tasks_id: req.body.tasks_id
                    } 
                })
                .then(() => {
                    res.status(200).send({ message: 'task week successfully updated' });
                })
                .catch((err) => {
                    res.status(500).send({ err });
                });

            } else {

                TaskWeek.create(data)
                .then(() => {
                    res.status(200).send({ message: 'task week successfully created' });
                })
                .catch((err) => {
                    res.status(500).send({ err });
                });
                
            }
        }
    });

    app.get('/task/week', [authorization], function(req, res) {
        const Task = app.database.db.models.Task;
        Task.findAll({
            include: 'tasksWeeks'
        }).then((data) => {
            res.status(200).send(data);
        });
    });
}