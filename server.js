const dotenv = require("dotenv").config()
const colors = require("colors")
const mongoose = require("mongoose")



const app = require("./app")
// database connection 
mongoose.connect(process.env.DATABASE).then(() => {
    console.log("Database connection is successful".red.bold)
})

const productsSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true, // trim for removing the spacing
        unique: [true, "Name must be unique"],
        minLength: [3, "Name must be at least 3 characters"],
        maxLength: [100, "Name is too large"]
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: [0, "Price can't be negative "]
    },
    unit: {
        type: String,
        required: true,
        enum: {
            value: ["kg", "liter", "pcs"],
            message: "Unit value can't be {VALUE}, must be kg/liter/pcs"
        }
    },
    quantity: {
        type: Number,
        required: true,
        min: [0, "Quantity can't be negative"],
        validate: {
            validator: (value) => {
                const isInteger = Number.isInteger(value);
                if (isInteger) {
                    return true
                }
                else {
                    return false
                }
            },
            message: "Quantity must be integer"
        }
    },
    status: {
        type: String,
        required: true,
        enum: {
            value: ["in-stock", "out-of-stock", "discounted"],
            message: "Status can't be {VALUE}"
        }
    },
    // createdAt: {
    //     type: Date,
    //     default: Date.now
    // },
    // updatedAt: {
    //     type: Date,
    //     default: Date.now
    // }
    supplier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Supplier"
    },
    categories: [{
        name: {
            type: String,
            required: true,
        },
        _id: mongoose.Schema.Types.ObjectId
    }]
}, {
    timestamps: true,
})




const port = process.env.POST || 5000;

app.listen(port, () => {
    console.log(`App is running on port ${port}`.yellow.bold);
})
