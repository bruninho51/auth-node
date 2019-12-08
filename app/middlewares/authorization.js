module.exports = function(app) {

    const md5 = require('md5')
    const jwt = require('jsonwebtoken')

    var authorization = function(req, res, next) {
        let token = req.headers['authorization']
        if(token.startsWith('Bearer ')) {
            token = token.slice(7, token.length)
        }

        if(token) {
            const Auth = app.models.Auth
            Auth.findOne({
                where: { hash: md5(token), active: true }
            }).then(auth => {
                if(auth != undefined) {
                    jwt.verify(token, process.env.SECRET, (err, decoded) => {
                        if(err) {
                            res.status(401).send('access forbiden.')
                        }else {
                            req.decoded = decoded
                            next()
                        }
                    })
                }else {
                    res.status(401).send('access forbiden.')
                }
            })
        }else {
            res.status(401).send('access forbiden.')
        }
    }

    return authorization
}