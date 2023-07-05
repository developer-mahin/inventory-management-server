const express = require("express")
const router = express.Router()
const authController = require("../controllers/auth-controller")
const verifyToken = require("../middleware/verifyToken")



router.post("/signup", authController.createUser)
router.post("/login", authController.loginUser)
router.get("/me", verifyToken, authController.getMe)


module.exports = router