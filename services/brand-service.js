const Brand = require("../model/brand")

exports.createBrandService = async (data) => {
    const result = await Brand.create(data)
    return result
}

exports.getBrandService = async () => {
    const result = await Brand.find({})
    return result
}