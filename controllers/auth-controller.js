const { createUserService, getUserByEmail } = require("../services/auth-service")
const response = require("../utils/response")
const { generateToken } = require("../utils/token")


exports.createUser = async (req, res, next) => {
    try {
        const user = await createUserService(req.body)

        // response(res, 200, "success", "successfully created the user", user)

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

// exports.loginUser = async (req, res, next) => {
//     try {
//         const { email, password } = req.body;
//         if (!email || !password) {
//             return res.status(401).json({
//                 status: "failed",
//                 error: "Please provide your email and  password"
//             })
//         };

//         const user = await getUserByEmail(email)
//         if (!user) {
//             return res.status(401).json({
//                 status: "failed",
//                 error: "User not found please create an account"
//             })
//         }

//         const isValidPassword = user.comparePassword(password, user.password)
//         if (!isValidPassword) {
//             return res.status(401).json({
//                 status: "failed",
//                 error: "Please provide valid user info"
//             })
//         }

//         if (user.status != "active") {
//             return res.status(401).json({
//                 status: "failed",
//                 error: "user not activated please try again"
//             })
//         }


//         const { password: pwd, ...others } = user.toObject();
//         const token = generateToken(user)
//         res.status(200).json({
//             status: "success",
//             message: "successfully login user",
//             data: {
//                 others,
//                 token
//             }
//         })

//     } catch (error) {
//         res.status(500).json({
//             status: "failed",
//             message: "Please provide valid info",
//             error: error.message
//         })
//     }
// }



exports.loginUser = async (req, res, next) => {
    try {

        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                status: "failed",
                error: "Please provide user info"
            })
        }

        const user = await getUserByEmail(email)

        if (!user) {
            return res.status(400).json({
                status: "failed",
                error: "User not found please create an account"
            })
        }

        const isValidPassword = user.comparePassword(password, user.password)
        if (!isValidPassword) {
            return res.status(400).json({
                status: "failed",
                error: "Password not matched"
            })
        }

        if (user.status != "active") {
            return res.status(400).json({
                status: "failed",
                error: "User not active please contact with admin"
            })

        }

        const token = generateToken(user)

        res.status(200).json({
            status: "success",
            message: "successfully login user",
            data: {
                user,
                token
            }
        })

    } catch (error) {


        res.status(500).json({
            status: "failed",
            error: error.message
        })

    }
}




exports.getMe = async (req, res, next) => {
    try {

        const user = await getUserByEmail(req?.user?.email)
        res.status(200).json({
            status: "success",
            message: "Successfully get",
            data: {
                user
            }
        })

    } catch (error) {
        res.status(500).json({
            status: "failed",
            message: "Please provide valid info",
            error: error.message
        })
    }
}