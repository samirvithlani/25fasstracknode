const mongoose = require("mongoose")
const Schema = mongoose.Schema; //class --> collection rep...

const userModel = new Schema({
    name:{
        type:String
    },
    age:{
        type:Number
    },
    gender:{
        type:String
    },
    bloodGroup:{
        type:String,
        enum:["A+","B+","A-","O+"]
    },
    hobbies:[
        {
            type:String,
        }
    ]

})

// mongoose.model("users",userModel)
// module.exports = userModel

module.exports = mongoose.model("users",userModel)

//db.users.find()
//userModel.find()

//userModel -->db -mern_morning_node -->user[bind..]
