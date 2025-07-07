const router = require("express").Router()
const uploadController = require("../controller/UploadController")
router.post("/",uploadController.uploadFile)
module.exports = router