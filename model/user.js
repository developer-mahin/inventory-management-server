const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcryptjs")

const userSchema = mongoose.Schema(
    {
        email: {
            type: String,
            validator: [validator.isEmail, "Provide a valid email"],
            trim: true,
            lowercase: true,
            unique: true,
            required: [true, "Email Address is required"]
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            validate: {
                validator: (value) => validator.isStrongPassword(value, {
                    minLength: 6,
                    minLowercase: 2,
                    minUppercase: 1,
                    minSymbols: 1
                }),
                message: "Password {VALUE} is not strong enough"
            },
        },
        confirmPassword: {
            type: String,
            required: true,
            validate: {
                validator: function (value) {
                    return value === this.password
                },
                message: "Password does'nt match"
            },
        },
        role: {
            type: String,
            enum: ["buyer", "store-manager", "admin"],
            default: "buyer"
        },
        firstName: {
            type: String,
            required: [true, "Please provide first name"],
            trim: true,
            minLength: [3, "Name must be at least 3 characters"],
            maxLength: [100, "Name is too large"]
        },
        lastName: {
            type: String,
            required: [true, "Please provide last name"],
            trim: true,
            minLength: [3, "Name must be at least 3 characters"],
            maxLength: [100, "Name is too large"]
        },
        contactNumber: {
            type: String,
            validate: [validator.isMobilePhone, "please provide a valid contact number"]
        },
        shippingAddress: String,
        imgURL: {
            type: String,
            validate: [validator.isURL, "Please provide valid url"]
        },
        status: {
            type: String,
            enum: ["active", "de-active", "blocked"],
            default: "active"
        },
        passwordChangedAt: Date,
        passwordResetToken: String,
        passwordResetExpires: Date,
    },
    {
        timeStamps: true
    }
)

userSchema.pre("save", function (next) {
    const password = this.password;
    const hashedPassword = bcrypt.hashSync(password);
    this.password = hashedPassword;
    this.confirmPassword = undefined;
    next()
})

userSchema.methods.comparePassword = function (password, hash) {
    const isValidPassword = bcrypt.compareSync(password, hash)
    return isValidPassword
}

const User = mongoose.model("User", userSchema);
module.exports = User;