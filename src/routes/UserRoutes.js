//express...
const router = require("express").Router() //server req -->as it is controller...
const userController = require("../controller/UserController") 

//http://localhost:3000/user
// router.get("/user",(req,res)=>{

//     res.send("User api called....")
// })

router.get("/user",userController.getUser)
//http://localhost:3000/user/users
router.get("/users",userController.getAllUsers)
router.get("/finduser/:id",userController.findUser)

module.exports = router