const { createStoreService, getStoreService, getSpecificStoreService, updateStoreService, deleteStoreService } = require("../services/store-service");

exports.createStore = async (req, res, next) => {
    try {
        const data = req.body;
        const result = await createStoreService(data)
        res.status(200).json({
            status: "success",
            message: "Successfully store created"
        })

    } catch (error) {
        res.status(400).json({
            status: "failed",
            message: " store not created",
            error: error.message
        })
    }
}

exports.getStore = async (req, res, next) => {
    try {
        const result = await getStoreService()
        res.status(200).json({
            status: "success",
            message: "Successfully get data",
            data: result
        })

    } catch (error) {
        res.status(400).json({
            status: "failed",
            message: "can't get the data",
            error: error.message
        })
    }
}

exports.getSpecificStore = async (req, res, next) => {
    try {
        const { id } = req.params
        const result = await getSpecificStoreService(id)
        res.status(200).json({
            status: "success",
            message: "Successfully get data",
            data: result
        })

    } catch (error) {
        res.status(400).json({
            status: "failed",
            message: "can't get the data",
            error: error.message
        })
    }
}

exports.updateStore = async (req, res, next) => {
    try {
        const { id } = req.params
        const data = req.body;
        const result = await updateStoreService(id, data)

        if (!result.modifiedCount) {
            res.status(400).json({
                status: "failed",
                message: "can't update the data",
                error: error.message
            })
        }

        res.status(200).json({
            status: "success",
            message: "Successfully update data",
        })

    } catch (error) {
        res.status(400).json({
            status: "failed",
            message: "can't update the data",
            error: error.message
        })
    }
}


exports.deleteStore = async (req, res, next) => {
    try {
        const { id } = req.params
        const result = await deleteStoreService(id)

        res.status(200).json({
            status: "success",
            message: "Successfully delete data",
        })

    } catch (error) {
        res.status(400).json({
            status: "failed",
            message: "can't delete the data",
            error: error.message
        })
    }
}