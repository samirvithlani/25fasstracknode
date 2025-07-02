const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const roleModel = new Schema({
    name:{
        type:String
    }
})

//collection bind..

module.exports = mongoose.model("roles",roleModel)
