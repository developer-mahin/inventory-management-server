const express = require("express")
const router = express.Router()

const brandController = require("../controllers/brand-controller")

router.route("/")
    .post(brandController.createBrand)
    .get(brandController.getBrands)


router.route("/:id")
    .get(brandController.getSpecificBrand)
    .patch(brandController.updatedBrand)



    
module.exports = router