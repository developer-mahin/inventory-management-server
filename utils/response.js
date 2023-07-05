module.exports = (res, status, statusMessage, message, data, token) => {
    res.status(status).json({
        status: statusMessage,
        message: message,
        error: error,
        data: {
            data,
            token
        }
    })
}