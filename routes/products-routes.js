const express = require("express")
const productsController = require("../controllers/products-controller")
const authorization = require("../middleware/authorization");
const verifyToken = require("../middleware/verifyToken");

const router = express.Router();


router.route("/")
    .get(productsController.getAllProduct)
    .post(verifyToken, authorization("admin"), productsController.addProducts)

router
    .route("/bulk-update")
    .patch(productsController.bulkProductUpdate)

router
    .route("/bulk-delete")
    .delete(productsController.bulkProductDelete)


router
    .route("/:id")
    .patch(productsController.updateProduct)
    .get(productsController.getProductById)
    .delete(productsController.deleteProductById)



module.exports = router;