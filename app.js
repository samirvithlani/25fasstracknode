const express = require("express") //express...
const mongoose  = require("mongoose")
const app = express()
app.use(express.json()) //global middleware.. content type json
require("dotenv").config()
const {Queue} = require("bullmq")
const Redis = require("ioredis")
const cron = require("node-cron")


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
const { json } = require("zod/v4")
app.use("/upload",uploadRoutes)





//function async await...
mongoose.connect("mongodb://127.0.0.1:27017/mern_morning_node").then(()=>{
    console.log("db connected...")
}).catch((err)=>{
    console.log("error in db connection...")
})


const fakeData = {
    1:{name:"amit",age:22},
    2:{name:"sachin",age:23},
    3:{name:"sourabh",age:24},
    4:{name:"priyanshu",age:25},
    5:{name:"priyanka",age:26}
}

const CACHE_EXPIRY = 600
const cacheMiddleware = async(req,res,next)=>{

    const {id} = req.params; //1
    try{
        const cacheData = await redisConnection.get(id)
        if(cacheData){
            console.log("cache hit...")
            return res.json(JSON.parse(cacheData))
        }
        console.log("cache misss")
        next()
    }catch(err){

        console.log("redis error...")
        next()
    }
}

app.get("/user/:id",cacheMiddleware,async(req,res)=>{

    const {id} = req.params
    const foundUser = fakeData[id] //1:{}
    //redis...
    //key
    redisConnection.setex(id,CACHE_EXPIRY,JSON.stringify(foundUser))
    //1,600,1:{}
    return res.json(foundUser) //1
})

cron.schedule("*/2 * * * *",()=>{
    console.log("running every minute...")
})


//* -->second
//* -> minute -(0-59)
//* -->hour -(0-23)
//* -->day of month (1-31)
//* month (1-12)
//* day of week (0-7)

//******  --> every min
//*/5**** -->eveey 5 min
//0 1 *** --> every day at 1 am
//0 9 ** 1




//SERVER CREATION
const PORT = process.env.PORT
app.listen(PORT,()=>{
    console.log(`server started on PORT ${PORT}`)
})
