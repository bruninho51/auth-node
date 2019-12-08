module.exports = function(app) {

    const md5 = require('md5')
    const jwt = require('jsonwebtoken')

    const Auth = app.models.Auth
    const User = app.models.User

    app.post('/auth', function(req, res) {
        //Gerar token e salvar hash no banco
        let email = req.body.email
        let pwd = req.body.pwd

        if(email != undefined && pwd != undefined) {
            User.findOne({
                where: { email, pwd }, raw: true
            }).then(user => {
                if(user != undefined) {
                    let token = jwt.sign({user}, process.env.SECRET, {
                        expiresIn: 300 // expires in 5min
                    })
                    
                    Auth.create({hash: md5(token), active: true}).then(() => {
                        res.status(200).send({ auth: true, token: token })
                    })
                } else {
                    res.status(500).send({ message: 'invalid credentials.' })
                }
            })
        }else {
            res.status(500).send({ message: 'invalid credentials.' })
        }
    })

    app.get('/logout', function(req, res) {
        let token = req.headers['authorization']
        if(token.startsWith('Bearer ')) {
            token = token.slice(7, token.length)
        }

        if(token) {
            const Auth = app.models.Auth
            Auth.update(
                {active: false},
                {where: { hash: md5(token) }}
            ).then(() => res.redirect('/'))
        }else {
            res.redirect('/')
        }
    })

    app.get('/auth', function(req, res) {
        res.send(200, 'Teste');
    })
}
