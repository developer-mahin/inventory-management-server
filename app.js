const express = require("express")
const app = express()
const cors = require("cors")
const productRoute = require("./routes/products-routes")
const brandRoute = require("./routes/brand-routes")
const categoryRoute = require("./routes/category-routes")
const storeRoute = require("./routes/store-routes")
const authRoute = require("./routes/auth-routes")


app.use(express.json())
app.use(cors())


app.use("/api/v1/auth", authRoute)
app.use("/api/v1/product", productRoute);
app.use("/api/v1/brand", brandRoute);
app.use("/api/v1/category", categoryRoute)
app.use("/api/v1/store", storeRoute)

app.get("/", async (req, res) => {
    console.log("Inventory management server is running".yellow.bold)
    res.send(`<h1>Server is running </h1>`)
})



module.exports = app;