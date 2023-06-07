const express = require("express")
const app = express()
const cors = require("cors")
const User = require("./model/user")
const { generateToken } = require("./utils/token")
const verifyToken = require("./middleware/verifyToken")
const productRoute = require("./routes/products-routes")

app.use(express.json())
app.use(cors())

app.use("/api/v1", productRoute)





app.get("/", async (req, res) => {
    console.log("Inventory management server is running".yellow.bold)
    res.send(`<h1>Server is running </h1>`)
})

module.exports = app;