const Product = require("../model/product")

exports.createProductService = async (data) => {
    const product = new Product(data)
    if (product.quantity === 0) {
        product.status = "out-of-stock"
    }
    const result = await product.save()
    return result;
}


exports.getProductsService = async () => {
    const result = await Product.find({})
    return result
}

exports.updateProductService = async (id, data) => {
    const result = await Product.updateOne(
        { _id: id },
        { $set: data },
        { runValidator: true }
    )
    return result
}