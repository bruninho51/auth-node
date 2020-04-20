module.exports = function(app) {

    const md5 = require('md5');
    const crypto = require('crypto');
    const jwt = require('jsonwebtoken');

    const Auth = app.database.db.models.Auth;
    const User = app.database.db.models.User;
    console.log(app.database.db);

    app.post('/auth', function(req, res) {
        //Gerar token e salvar hash no banco
        let email = req.body.email;
        let pwd = req.body.pwd;

        if(email && pwd) {
            let hash = crypto.createHash('sha256')
                         .update(process.env.SECRET + pwd)
                         .digest('hex');

            User.findOne({
                where: { email: email, pwd: hash }, raw: true
            }).then(user => {
                if(user) {
                    let token = jwt.sign({user}, process.env.SECRET, {
                        expiresIn: process.env.TOKEN_TIME
                    });
                    
                    Auth.update({active: false},
                        {where: { clientTable: 'users', clientId: user.id, active: true }}
                    ).then(() => {
                        Auth.create({
                            hash: md5(token), 
                            clientTable: 'users',
                            clientId: user.id,
                            active: true
                        }).then(() => {
                            res.status(200).send({ auth: true, token: token });
                        })  
                    })
                } else {
                    res.status(401).send({ auth: false, message: 'invalid credentials.' });
                }
            })
        }else {
            res.status(401).send({ auth: false, message: 'invalid credentials.' });
        }
    });

    app.get('/logout', function(req, res) {
        let token = req.headers['authorization'];
        if(token.startsWith('Bearer ')) {
            token = token.slice(7, token.length);
        }

        if(token) {
            const Auth = app.database.db.models.Auth;
            Auth.update(
                {active: false},
                {where: { hash: md5(token) }}
            ).then(() => res.redirect('/'))
        }else {
            res.redirect('/');
        }
    });

    app.get('/auth', function(req, res) {
        res.send(200, 'Teste');
    });
};
