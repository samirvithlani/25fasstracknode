//express...
const router = require("express").Router() //server req -->as it is controller...
const userController = require("../controller/UserController") 
const validateRequest = require("../middleware/RequestMiddleware")

//http://localhost:3000/user
// router.get("/user",(req,res)=>{

//     res.send("User api called....")
// })

router.get("/user",userController.getUser)
//http://localhost:3000/user/users
router.get("/users",userController.getAllUsers)
router.get("/finduser/:id",userController.findUser)
router.get("/searchuser/:name",userController.searchUser)
router.get("/getusers",userController.getUsersFromDb)
router.get("/getuserbyid/:id",userController.getUserById)

router.delete("/deleteuser/:id",userController.deleteUser)
router.put("/updateuser/:id",userController.updateUser)

router.post("/adduser",validateRequest,userController.addUser)

router.put("/addhobby/:id",userController.addHobby)

module.exports = router