const { validationResult } = require('express-validator');

module.exports = function(app) {

    const profileValidator = app.validators.profile;
    const authorization = app.middlewares.authorization;

    app.post('/profile', [authorization, profileValidator], function(req, res) {
        console.log('caiu na rota');
        const crypto = require('crypto');

        const Profile = app.database.db.models.Profile;

        let errors = validationResult(req).array();
        if(errors.length > 0) {
	    console.log('Error validating as info');
            res.status(422).send({ errors: errors, message: 'Error validating as info' });
        }else {
            let hash = crypto.createHash('sha256')
                             .update(process.env.SECRET + req.body.pwd)
                             .digest('hex');

            let nickname = req.body.nickname;
            let pwd = hash;
            let dateOfBird = req.body.dateOfBird;
            let score = req.body.score;
            let users_id = req.decoded.user.id;
    
            Profile.create({
                nickname,
                pwd,
                dateOfBird,
                score,
                users_id
            }).then(() => {
		console.log('profile created successfully. ');
                res.status(200).send({ message: 'profile created successfully.' });
            }).catch(() => {
		console.log('profile not has been created');
	    })
        }
    });
};
