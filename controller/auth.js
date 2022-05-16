let crypto = require('crypto')
const tokenKey = '1a2b-3c4d-5e6f-7g8h'

const users = require('../mobels/users')
exports.middlewareAuth = async function (req, res, next) {
    console.log(req.headers.authorization)
    if (req.headers.authorization) {
        let tokenParts = req.headers.authorization
            .split('.')
        //.split('.')
        let signature = crypto
            .createHmac('SHA256', tokenKey)
            .update(`${tokenParts[0]}.${tokenParts[1]}`)
            .digest('base64')

        if (signature === tokenParts[2])
            req.user = JSON.parse(
                Buffer.from(tokenParts[1], 'base64').toString(
                    'utf8'
                )
            )
        next()
    }
    // req.user = {name: 'Guest'}
    next()
}

exports.authByLogin = async function (req, res){

    const email = req.body.email
    const password = req.body.password


    users.findOne( {email: email, password: password},function(err, user) {
        if (err) {
            console.error(err)
            return res.status(500).json({ message: 'DB Error' })
        }
        // console.log('Get User:')
        // console.log(user)

        if(!user) {
            return res.status(404).json({ message: 'User Not Find' })
        }

        let head = Buffer.from(
            JSON.stringify({ alg: 'HS256', typ: 'jwt' })
        ).toString('base64')
        // todo: Может не всего пользователя
        let body = Buffer.from(JSON.stringify(user)).toString(
            'base64'
        )
        let signature = crypto
            .createHmac('SHA256', tokenKey)
            .update(`${head}.${body}`)
            .digest('base64')

        return res.status(200).json({
            id: user._id,
            email: user.email,
            token: `${head}.${body}.${signature}`,
        })

    })

    // return res.status(404).json({ message: 'User not found' })
}


exports.tryCreateUser = async function (req, res ){
    const email = req.body.email
    const password = req.body.password

    // TODO: Организовать проверки

    const newUser = new users()
    newUser.email = email
    newUser.password = password
    newUser.isVerify = false

    console.log(newUser)

    newUser.save( function (err) {
        if(err) {
            console.error(err)
            return err
        }
        // TODO: отослать письмо на почту, что бы проверить валидность
        res.status(201).json(newUser)
    })
}