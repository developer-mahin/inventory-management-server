const { mongoose } = require("mongoose");
const validator = require("validator")
const { ObjectId } = mongoose.Schema.Types

const brandSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a brand name"],
        unique: true,
        trim: true,
    },
    description: String,
    email: {
        type: String,
        validate: [validator.isEmail, "Please provide a valid email"],
        lowercase: true
    },
    location: String,
    website: {
        type: String,
        validate: [validator.isURL, "Please provide a valid url"]
    },
    product: [{
        type: ObjectId,
        ref: "Product"
    }],
    supplier: [{
        name: String,
        contactNumber: String,
        id: {
            type: ObjectId,
            ref: "Supplier"
        }
    }],
    status: {
        type: String,
        enum: ["active", "in-active"],
        default: "active"
    }
}, {
    timestamps: true
})


const Brand = mongoose.model("Brand", brandSchema)
module.exports = Brand

