const { mongoose } = require("mongoose");

const productSchema = mongoose.Schema({
    name: {
        type: String,
        require: [true, "Please provide the product name"],
        trim: true,
        unique: [true, "Name must be unique"],
        minLength: [3, "Name must be at least 3 character"],
        maxLength: [100, "Name can't be more then 100 character"]
    },
    description: {
        type: String,
        require: [true, "Please provide a description"],
        trim: true,
        // minLength: [50, "Description must be at least 50 character"]
    },
    price: {
        type: Number,
        require: true,
        min: [0, "Price can't be negative"]
    },
    unit: {
        type: String,
        require: true,
        enum: {
            values: ["kg", "liter", "pcs"],
            message: "Unit values Can't be {VALUE}, must be kg/liter/pcs"
        }
    },
    quantity: {
        type: Number,
        require: true,
        min: [0, "Quantity can't be negative"],
        validate: {
            validator: (value) => {
                const isInteger = Number.isInteger(value)
                if (isInteger) {
                    return true
                }
                else {
                    return false
                }
            }
        },
        message: "Quantity must be an integer"
    },
    status: {
        type: String,
        require: true,
        enum: {
            values: ["in-stock", "out-of-stock", "discontinued"],
            message: "Status can't be {VALUE}"
        }
    }
    // supplier: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "supplier"
    // },
    // categories: [{
    //     name: {
    //         type: String,
    //         require: true
    //     },
    //     _id: mongoose.Schema.Types.ObjectId
    // }]

}, {
    timestamps: true
})

const Product = mongoose.model("Product", productSchema)
module.exports = Product;