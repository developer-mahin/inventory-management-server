const Store = require("../model/store")

exports.createStoreService = async (data) => {
    const result = await Store.create(data)
    return result;
}

exports.getStoreService = async () => {
    const result = await Store.find({})
    return result;
}

exports.getSpecificStoreService = async (id) => {
    const result = await Store.findOne({ _id: id })
    return result;
}

exports.updateStoreService = async (id, data) => {
    const result = await Store.updateOne({ _id: id }, data, {
        runValidators: true
    })
    return result;
}

exports.deleteStoreService = async (id) => {
    const result = await Store.deleteOne({ _id: id })
    return result;
}