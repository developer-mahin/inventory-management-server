const { mongoose } = require("mongoose");
const validator = require("validator")
const { ObjectId } = mongoose.Schema.Types

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide the product name"],
        trim: true,
        unique: [true, "Name must be unique"],
        minLength: [3, "Name must be at least 3 character"],
        maxLength: [100, "Name can't be more then 100 character"]
    },
    description: {
        type: String,
        required: [true, "Please provide a description"],
        trim: true,
    },

    unit: {
        type: String,
        required: true,
        enum: {
            values: ["kg", "liter", "pcs", "bag"],
            message: "Unit values Can't be {VALUE}, must be kg/liter/pcs/bag"
        }
    },
    imageUrls: [{
        type: String,
        required: true,
        validate: (values) => {
            if (!Array.isArray(values)) {
                return false
            };

            let validUrl = true;
            values.forEach(url => {
                if (validator.isURL(url)) {
                    validUrl = false
                }
            })
            return validUrl
        },
        message: "Please provide a valid image url"
    }],
    category: {
        type: String,
        required: true
    },
    brand: {
        name: {
            type: String,
            required: true
        },
        id: {
            type: ObjectId,
            ref: "Brand",
            required: true
        }
    }

}, {
    timestamps: true
})


productSchema.pre("save", function (next) {
    console.log("before save data")
    next()
})

const Product = mongoose.model("Product", productSchema)
module.exports = Product;