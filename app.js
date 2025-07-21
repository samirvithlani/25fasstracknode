const express = require("express") //express...
const mongoose  = require("mongoose")
const app = express()
app.use(express.json()) //global middleware.. content type json
require("dotenv").config()
const {Queue} = require("bullmq")
const Redis = require("ioredis")


//redis -->database...
//redis server -- WSL --> connection

const redisConnection = new Redis({
    host:"127.0.0.1",
    port:6379
})


const myQueue = new Queue("taskQueue",{connection:redisConnection})

//app.js api..
app.post("/add-job",async(req,res)=>{
    const {name} = req.body;
    await myQueue.add("task",{name},{delay:0})
    res.json({success:true,message:"job addedd for "+name})

})


//routes require...
const userRoutes = require("./src/routes/UserRoutes")
//app.use(userRoutes)
app.use("/user",userRoutes)


const roleRoutes = require("./src/routes/RoleRoutes")
app.use("/role",roleRoutes)


const uploadRoutes = require("./src/routes/UploadRoutes")
app.use("/upload",uploadRoutes)





//function async await...
mongoose.connect("mongodb://127.0.0.1:27017/mern_morning_node").then(()=>{
    console.log("db connected...")
}).catch((err)=>{
    console.log("error in db connection...")
})

//SERVER CREATION
const PORT = process.env.PORT
app.listen(PORT,()=>{
    console.log(`server started on PORT ${PORT}`)
})
