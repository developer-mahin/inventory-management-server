const express = require("express")
const productsController = require("../controllers/products-controller")


const router = express.Router();

router.post("/add-product", productsController.addProducts)


module.exports = router;