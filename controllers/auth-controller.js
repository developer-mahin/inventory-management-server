
app.post("/signup", async (req, res) => {
    try {
        const userInfo = req.body
        const user = await User.create(userInfo)
        const token = generateToken(user)

        res.status(200).json({
            status: "success",
            message: "Successfully signed up user",
            data: {
                token
            }
        })

    } catch (error) {
        res.status(500).json({
            status: "Failed",
            error
        })
    }
})

// login user
app.post("/login", async (req, res) => {

    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(401).json({
                status: "fail",
                error: "Please provide valid user credentials"
            })
        }

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(401).json({
                status: "fail",
                error: "User not found, Please create an accountF "
            })
        }

        const isValidPassword = user.comparePassword(password, user.password)
        if (!isValidPassword) {
            return res.status(401).json({
                status: "fail",
                error: "Password is not correct"
            })
        }

        const token = generateToken(user)
        const { password: pwd, ...others } = user.toObject()

        res.status(200).json({
            status: "Success",
            message: "Successfully user login",
            data: {
                user: others,
                token
            }
        })


    } catch (error) {
        res.status(500).json({
            status: "fail",
            error
        })
    }

})


app.get("/me", verifyToken, async (req, res) => {
    try {
        const user = await User.findOne({ email: req.user?.email })
        const { password: pwd, ...others } = user.toObject()

        res.status(200).json({
            status: "success",
            data: {
                others
            }
        })

    } catch (error) {
        res.status(500).json({
            status: "fail",
            error
        })
    }
})
