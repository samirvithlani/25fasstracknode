const express = require("express") //express...
const app = express()


//routes require...
const userRoutes = require("./src/routes/UserRoutes")
//app.use(userRoutes)
app.use("/user",userRoutes)





//SERVER CREATION
const PORT = 3000
app.listen(PORT,()=>{
    console.log(`server started on PORT ${PORT}`)
})
