const { createBrandService, getBrandService, getSpecificBrandService, updatedBrandService } = require("../services/brand-service")

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


exports.getSpecificBrand = async (req, res, next) => {
    try {

        const { id } = req.params
        const result = await getSpecificBrandService(id)
        res.status(200).json({
            status: "Success",
            message: "Successfully get the data",
            data: result
        })

    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Brand not get",
            error: error.message
        })
    }
}

exports.updatedBrand = async (req, res, next) => {
    try {

        const { id } = req.params;
        const data = req.body;
        const result = await updatedBrandService(id, data)
        console.log(result)


        if (!result.modifiedCount) {
            res.status(400).json({
                status: "fail",
                message: "Brand not successfully update",
            })
        }
        res.status(200).json({
            status: "Success",
            message: "Successfully get the data",
            data: result
        })

    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Brand not get",
            error: error.message
        })
    }
}