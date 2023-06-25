const Brand = require("../model/brand")

exports.createBrandService = async (data) => {
    const result = await Brand.create(data)
    return result
}

exports.getBrandService = async () => {
    const result = await Brand.find({})
    return result
}

exports.getSpecificBrandService = async (id) => {
    const result = await Brand.findOne({ _id: id })
    return result
}

exports.updatedBrandService = async (id, data) => {
    const result = await Brand.updateOne({ _id: id }, data, {
        runValidators: true
    })
    return result
}