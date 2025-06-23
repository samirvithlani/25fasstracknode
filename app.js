const express = require("express") //express...
const app = express()


//first api...
//GET POST PUT DELETE
//url: 
//http://localhost:3000/test
//()=>{}
app.get("/test",(req,res)=>{

    console.log("test api called..........")
    res.send("Test API CALLED")

})

const userObj = {
    id:1001,
    name:"ram",
    age:22,
    status:"Avtive"
}

//http://localhost:3000/user
app.get("/user",(req,res)=>{
    res.json(userObj)
})

var userList = [
    {
        id:1001,
        name:"ram",
        age:22,
        status:"Avtive"
    },
    {
        id:1002,
        name:"ram",
        age:22,
        status:"Avtive"
    },
    {
        id:1003,
        name:"ram",
        age:22,
        status:"Avtive"
    },
    {
        id:1004,
        name:"ram",
        age:22,
        status:"Avtive"
    }

]

app.get("/users",(req,res)=>{

    res.json(userList)
})





//SERVER CREATION
const PORT = 3000
app.listen(PORT,()=>{
    console.log(`server started on PORT ${PORT}`)
})
