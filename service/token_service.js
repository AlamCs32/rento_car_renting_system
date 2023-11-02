const jwt = require('jsonwebtoken')
require('dotenv').config()
const { secretKey } = process.env

class TokenService {
    static sing(payload, secret = secretKey, expire) {
        return expire
            ? jwt.sign(payload, secret, { expiresIn: expire })
            : jwt.sign(payload, secret)
    }
    static verify(Token, secret = secretKey) {
        return jwt.verify(Token, secret)
    }
}
module.exports = TokenService