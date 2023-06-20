const { createBrandService, getBrandService } = require("../services/brand-service")

exports.createBrand = async (req, res, next) => {
    try {
        const result = await createBrandService(req.body)
        res.status(200).json({
            status: "Success",
            message: "Successfully Brand created",
        })

    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Successfully not created",
            error: error.message
        })
    }
}

exports.getBrands = async (req, res, next) => {
    try {
        const result = await getBrandService()
        res.status(200).json({
            status: "Success",
            message: "Successfully Brand created",
            data: result
        })

    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Successfully not created",
            error: error.message
        })
    }
}