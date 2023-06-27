const User = require("../model/user")

exports.createUserService = async (userInfo) => {
    const user = await User.create(userInfo)
    return user
}

exports.getUserByEmail = async (email) => {
    const user = await User.findOne({ email })
    return user
}