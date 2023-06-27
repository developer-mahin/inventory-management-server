const { createUserService, getUserByEmail } = require("../services/auth-service")


exports.createUser = async (req, res, next) => {
    try {
        const user = await createUserService(req.body)
        res.status(200).json({
            status: "success",
            message: "successfully created the user",
            user: user
        })

    } catch (error) {
        res.status(500).json({
            status: "failed",
            error: error.message
        })
    }
}

exports.loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                status: "failed",
                error: "Please provide valid info"
            })
        }

        const user = await getUserByEmail(email)
        if (!user) {
            return res.status(400).json({
                status: "failed",
                error: "Please Create an account first"
            })
        }

        const isPasswordValid = user.comparePassword(password, user.password)
        if (!isPasswordValid) {
            return res.status(400).json({
                status: "failed",
                error: "Please provide valid email and password"
            })
        }

        if (user.status != "active") {
            return res.status(400).json({
                status: "failed",
                error: "Please provide valid email and password"
            })
        }

        


        res.status(200).json({
            status: "success",
            message: "successfully created the user",
            user: user
        })

    } catch (error) {
        res.status(500).json({
            status: "failed",
            error: error.message
        })
    }
}