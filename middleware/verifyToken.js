const jwt = require("jsonwebtoken")
const { promisify } = require("util")

module.exports = async (req, res, next) => {
    try {
        const token = req.headers?.authorization?.split(" ")?.[1]
        if (!token) {
            return res.status(400).json({
                status: "failed",
                error: "please login first"
            })
        }
        const decoded = await promisify(jwt.verify)(token, process.env.ACCESS_TOKEN)
        req.user = decoded;
        next()
    } catch (error) {

        res.status(500).json({
            status: "failed",
            error: error.message
        })
    }
}
