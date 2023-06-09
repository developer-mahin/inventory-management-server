const express = require("express")
const productsController = require("../controllers/products-controller")


const router = express.Router();


router.route("/")
    .get(productsController.getAllProduct)
    .post(productsController.addProducts)


router
    .route("/:id")
    .patch(productsController.updateProduct)


module.exports = router;