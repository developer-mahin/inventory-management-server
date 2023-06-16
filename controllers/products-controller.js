const {
    createProductService,
    getProductsService,
    updateProductService,
    getProductByIdService,
    bulkUpdateProductService,
    deleteProductByIdService,
    bulkDeleteProductService
} = require("../services/product-services")

exports.getAllProduct = async (req, res, next) => {
    try {

        let filters = { ...req.query }

        const excludeFields = ["sort", "page", "limit"]
        excludeFields.forEach(fields => delete filters[fields])



        let filtersString = JSON.stringify(filters)
        filtersString = filtersString.replace(/\b(gt|lt|gte|lte)\b/g, match => `$${match}`)

        filters = JSON.parse(filtersString)
        console.log(filters)


        const queries = {}
        if (req.query.sort) {
            const sortBy = req.query.sort.split(", ").join(" ")
            queries.sortBy = sortBy
        }

        if (req.query.fields) {
            const fields = req.query.fields.split(",").join(" ")
            queries.fields = fields
        }

        const result = await getProductsService(filters, queries)

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

exports.getProductById = async (req, res, next) => {
    try {

        const { id } = req.params
        const result = await getProductByIdService(id)
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
        const result = await createProductService(req.body)
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
        const result = await updateProductService(id, req.body)
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

exports.bulkProductUpdate = async (req, res, next) => {
    try {
        console.log(req.body)
        const result = await bulkUpdateProductService(req.body)

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

exports.deleteProductById = async (req, res, next) => {
    try {
        const { id } = req.params
        const result = await deleteProductByIdService(id)
        res.status(200).json({
            status: "success",
            message: "Product delete successfully",
            data: result
        })

    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Product is not delete",
            error: error.message
        })
    }
}

exports.bulkProductDelete = async (req, res, next) => {
    try {

        const { ids } = req.body
        const result = await bulkDeleteProductService(ids)

        res.status(200).json({
            status: "success",
            message: "Product delete successfully",
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Product is not delete",
            error: error.message
        })
    }
}