const Category = require("../model/category")

exports.addCategoryService = async (data) => {
    const result = await Category.create(data)
    return result;
}

exports.getCategoryService = async () => {
    const result = await Category.find({})
    return result;
}

exports.getSpecificCategoryService = async (id) => {
    const result = await Category.findOne({ _id: id })
    return result;
}

exports.updateCategoryService = async (id, data) => {
    const result = await Category.updateOne({ _id: id }, data, {
        runValidators: true
    })
    return result;
}

exports.deleteCategoryService = async (id) => {
    const result = await Category.deleteOne({ _id: id })
    return result;
}