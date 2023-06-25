const express = require("express")
const router = express.Router()
const categoryController = require("../controllers/category-controller")

router.route("/")
    .post(categoryController.addCategory)
    .get(categoryController.getCategory)


router.route("/:id")
    .get(categoryController.getSpecificCategory)
    .patch(categoryController.updateCategory)
    .delete(categoryController.deleteCategory)

module.exports = router;