const router = require("express").Router()
const roleController = require("../controller/RoleController")

router.post("/",roleController.createRole)
router.get("/",roleController.getRoles)

module.exports =router