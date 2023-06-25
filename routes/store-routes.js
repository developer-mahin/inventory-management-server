const express = require("express")
const router = express.Router()
const storeController = require("../controllers/store-controller")


router.route("/")
    .post(storeController.createStore)
    .get(storeController.getStore)



router.route("/:id")
    .get(storeController.getSpecificStore)
    .patch(storeController.updateStore)
    .delete(storeController.deleteStore)


module.exports = router;