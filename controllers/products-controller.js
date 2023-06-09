const { createProductService, getProductsService, updateProductService } = require("../services/product-services")

exports.getAllProduct = async (req, res, next) => {
    try {

        const result = getProductsService()

        res.status(200).json({
            status: "success",
            message: "successfully get the data",
            data: result
        })


    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "something went wrang!, can't get data",
            error: error.message
        })
    }
}


exports.addProducts = async (req, res, next) => {
    try {
        const result = createProductService(req.body)
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


exports.updateProduct = async (req, res, next) => {

    try {

        const { id } = req.params;
        const result = updateProductService(id, req.body)
        res.status(200).json({
            status: "success",
            message: "Product is updated successfully",
            data: result
        })

    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Product is not updated",
            error: error.message
        })
    }

}