const { validationResult } = require('express-validator');

module.exports = function(app) {
    const taskValidator = app.validators.task;
    const authorization = app.middlewares.authorization;

    app.post('/task', [authorization, taskValidator], function(req, res) {
        
        const Task = app.models.Task;

        let errors = validationResult(req).array();
        if(errors.length > 0) {
            res.status(422).send({ errors: errors, message: 'Error validating as info' });
        }else {
            let name = req.body.name;
            let description = req.body.description;
            let score = req.body.score;
            let minimumAge = req.body.minimumAge;
            let users_id = req.decoded.user.id;

            Task.create({
                name,
                description,
                score,
                minimumAge,
                users_id
            }).then(() => {
                res.status(200).send({ message: 'task created successfully.' });
            });
        }
    });

    app.get('/task', [authorization], function(req, res) {
        const Task = app.models.Task;
        Task.findAll().then((data) => {
            res.status(200).send(data);
        });
    });
};