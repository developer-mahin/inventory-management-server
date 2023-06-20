const { mongoose } = require("mongoose");
const { ObjectId } = mongoose.Schema.Types


const stockSchema = mongoose.Schema({
    productId: {
        type: ObjectId,
        required: true,
        ref: "Product"
    },

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
            // message: "Unit values Can't be {VALUE}, must be kg/liter/pcs/bag"
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

    price: {
        type: Number,
        required: true,
        min: [0, "Product price can't be negative"]
    },
    quantity: {
        type: Number,
        required: true,
        min: [0, "Product quantity can't be negative"]
    },
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
    },
    status: {
        type: String,
        required: true,
        enum: {
            values: ["in-stock", "out-of-stock", "discounted"],
            // message: "Status can't be {VALUE}"
        }
    },
    store: {
        name: {
            type: String,
            required: [true, "Please provide a store name"],
            unique: true,
            trim: true,
            enum: {
                values: ["dhaka", "chattogram", "rajshahi", "khulna", "sylhet", "barishal", "mymenshing"],
                // message: "{VALUE} is not a valid name"
            }
        },
        id: {
            type: ObjectId,
            required: true,
            ref: "Store"
        }
    },
    suppliedBy: {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        id: {
            type: ObjectId,
            ref: "Supplier"
        }
    }
}, {
    timestamps: true
})


const Stock = mongoose.model("Stock", stockSchema)
module.exports = Stock