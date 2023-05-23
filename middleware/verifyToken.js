const jwt = require("jsonwebtoken")

module.exports = async (req, res, next) => {
    try {

        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).send({ accessToken: "Unauthorized Access" })
        }
        const token = authHeader.split(" ")[1]
        jwt.verify(token, process.env.ACCESS_TOKEN, function (err, decoded) {
            if (err) {
                return res.status(403).send({ accessToken: "Forbidden Access" })
            }
            req.decoded = decoded
            req.user = decoded
        })
        next()

    } catch (error) {

        res.status(403).json({
            status: "fail",
            error: "Invalid token"
        })

    }
}