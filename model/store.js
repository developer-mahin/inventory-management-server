const { mongoose } = require("mongoose");
const { ObjectId } = mongoose.Schema.Types

const storeSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a store name"],
        unique: true,
        trim: true,
        enum: {
            values: ["dhaka", "chattogram", "rajshahi", "khulna", "sylhet", "barishal", "mymenshing"],
            message: "{VALUE} is not a valid name"
        }
    },
    description: String,
    status: {
        type: String,
        enum: ["active", "in-active"],
        default: "active"
    },
    manager: {
        name: String,
        contactNumber: String,
        id: {
            type: ObjectId,
            ref: "User"
        }
    }
}, {
    timestamps: true
})


const Store = mongoose.Schema("Brand", storeSchema)
module.exports = Store