const express = require("express")
const app = express()
const cors = require("cors")
const productRoute = require("./routes/products-routes")
const brandRoute = require("./routes/brand-routes")

app.use(express.json())
app.use(cors())

app.use("/api/v1/product", productRoute)
app.use("/api/v1/brand", brandRoute)

app.get("/", async (req, res) => {
    console.log("Inventory management server is running".yellow.bold)
    res.send(`<h1>Server is running </h1>`)
})



module.exports = app;