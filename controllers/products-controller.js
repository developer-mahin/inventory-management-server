const Product = require("../model/product")


exports.addProducts = async (req, res, next) => {
    try {
        const product = new Product(req.body)
        if (product.quantity === 0) {
            product.status = "out-of-stock"
        }
        const result = await product.save()

        res.status(200).json({
            status: "success",
            message: "product inserted successfully",
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Product is not inserted",
            error: error.message
        })
    }
}