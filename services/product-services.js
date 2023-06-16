const Product = require("../model/product")

exports.createProductService = async (data) => {
    const product = new Product(data)
    if (product.quantity === 0) {
        product.status = "out-of-stock"
    }
    const result = await product.save()
    return result;
}


exports.getProductsService = async (filters, queries) => {

    const result = await Product.find(filters)
        .sort(queries.sortBy)
        .select(queries.fields)
    return result
}


exports.getProductByIdService = async (id) => {
    const result = await Product.findOne({ _id: id })
    return result;
}

exports.updateProductService = async (id, data) => {
    const result = await Product.updateOne(
        { _id: id },
        { $set: data },
        { runValidator: true }
    )
    return result
}

exports.bulkUpdateProductService = async (data) => {

    // const result = await Product.updateMany(
    //     { _id: data.ids },
    //     data.data,
    //     { runValidator: true }
    // )

    const products = []
    data.ids.forEach(product => {
        products.push(Product.updateOne({ _id: product.id }, product.data))
    });
    const result = await Promise.all(products)
    return result
}

exports.deleteProductByIdService = async (id) => {
    const result = await Product.deleteOne({ _id: id })
    return result
}

exports.bulkDeleteProductService = async (id) => {
    const result = await Product.deleteMany({})
    return result
}