const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require('bcryptjs');


const userSchema = mongoose.Schema(
    {
        email: {
            type: String,
            validator: [validator.isEmail, "Provide a valid email"],
            trim: true,
            lowercase: true,
            unique: true,
            require: [true, "Email Address is required"]
        },
        password: {
            type: String,
            require: [true, "Password is required"],
            validator: (value) => validator.isStrongPassword(value, {
                minLength: 6,
                minLowerCase: 2,
                minUpperCase: 1,
                minSymbol: 1
            }),
            message: "Password {VALUE} is not strong enough"
        },
        firstName: {
            type: String,
            require: [true, "Please provide first name"],
            trim: true,
            minLength: [3, "Name must be at least 3 characters"],
            maxLength: [100, "Name is too large"]
        },
        lastName: {
            type: String,
            require: [true, "Please provide last name"],
            trim: true,
            minLength: [3, "Name must be at least 3 characters"],
            maxLength: [100, "Name is too large"]
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
    const hashedPassword = bcrypt.hashSync(password)
    this.password = hashedPassword
    next()
})

userSchema.methods.comparePassword = function (password, hash) {
    const isValidPassword = bcrypt.compareSync(password, hash)
    return isValidPassword
}

const User = mongoose.model("User", userSchema);
module.exports = User;