const jwt = require("jsonwebtoken")

exports.generateToken = (userInfo) => {
    const payload = {
        email: userInfo.email
    }
    const token = jwt.sign(payload, process.env.ACCESS_TOKEN, {
        expiresIn: "7d"
    })
    return token
}