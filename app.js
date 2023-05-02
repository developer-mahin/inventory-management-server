const express = require("express")
const app = express()
const cors = require("cors")


app.use(express.json())
app.use(cors())


app.get("/", async (req, res) => {
    console.log("Inventory management server is running".yellow.bold)
})

module.exports = app;