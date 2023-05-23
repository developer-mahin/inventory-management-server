const dotenv = require("dotenv").config()
const colors = require("colors")
const mongoose = require("mongoose")

const app = require("./app")

// database connection 
mongoose.connect(process.env.DATABASE).then(() => {
    console.log("Database connection is successful".red.bold)
});


const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`App is running on port ${port}`.yellow.bold);
})