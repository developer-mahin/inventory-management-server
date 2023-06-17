const { mongoose } = require("mongoose");
const validator = require("validator")

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: [true, "Please provide a category name"],
        lowercase: true,
        trim: true
    },
    description: String,
    imageUrl: {
        type: String,
        validate: [validator.isURL, "Please provide a valid URL"]
    }
}, {
    timestamps: true
});

const Category = mongoose.Schema("Category", categorySchema)
module.exports = Category