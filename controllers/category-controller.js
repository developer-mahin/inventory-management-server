const { addCategoryService, getCategoryService, getSpecificCategoryService, updateCategoryService, deleteCategoryService } = require('../services/category-service');

exports.addCategory = async (req, res, next) => {
    try {

        const data = req.body;
        const result = await addCategoryService(data)
        res.status(200).json({
            status: "success",
            message: "successfully category created"
        })

    } catch (error) {
        res.status(400).json({
            status: "failed",
            message: "can't created the category",
            error: error.message
        })
    }
}


exports.getCategory = async (req, res, next) => {
    try {
        const result = await getCategoryService()
        res.status(200).json({
            status: "success",
            message: "successfully get category",
            data: result
        })

    } catch (error) {
        res.status(400).json({
            status: "failed",
            message: "can't get the category",
            error: error.message
        })
    }
}


exports.getSpecificCategory = async (req, res, next) => {
    try {
        const { id } = req.params
        const result = await getSpecificCategoryService(id)
        res.status(200).json({
            status: "success",
            message: "successfully get category",
            data: result
        })

    } catch (error) {
        res.status(400).json({
            status: "failed",
            message: "can't get the category",
            error: error.message
        })
    }
}

exports.updateCategory = async (req, res, next) => {
    try {
        const { id } = req.params
        const data = req.body
        const result = await updateCategoryService(id, data)
        if (!result.modifiedCount) {
            res.status(400).json({
                status: "failed",
                message: "can't updated category",
            })
        }
        res.status(200).json({
            status: "success",
            message: "successfully updated category",
        })

    } catch (error) {
        res.status(400).json({
            status: "failed",
            message: "can't updated category",
            error: error.message
        })
    }
}

exports.deleteCategory = async (req, res, next) => {
    try {
        const { id } = req.params
        const result = await deleteCategoryService(id)
        res.status(200).json({
            status: "success",
            message: "successfully delete category",
        })

    } catch (error) {
        res.status(400).json({
            status: "failed",
            message: "can't delete category",
            error: error.message
        })
    }
}