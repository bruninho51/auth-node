module.exports = function(app) {
    const crypto = require('crypto');

    const User = app.models.User;

    app.post('/users', function(req, res) {
        let email = req.body.email;
        let pwd = req.body.pwd;

        if(email && pwd) {
            User.findOne({
                where: { email }, raw: true
            }).then(user => {
                if(user) {
                    res.status(500).send({ message: 'existing user' });
                }else {
                    let hash = crypto.createHash('sha256')
                                 .update(process.env.SECRET + pwd)
                                 .digest('hex');

                    console.log(hash);
                    User.create({ 
                        email: email, 
                        pwd: hash 
                    }).then((user) => {
                        res.status(200).send({ user });
                    })
                }
            });
        }else {
            res.send(500).send({ message: 'mandatory data not reported' });
        }
    });
};