const roleModel = require("../model/RoleModel")
const createRole = async(req,res)=>{


    try{

        const savedRole = await roleModel.create(req.body)
        //if..
        res.status(201).json({
            message:"role created...",
            data:savedRole

        }) 



    }catch(err){

        res.status(500).json({
            message:"err....",
            err:err

        })
    }


}

const getRoles = async(req,res)=>{

    try{

        const roles = await roleModel.find()
        if(roles && roles.length>0){
            res.status(200).json({
                message:"role found..",
                data:roles
            })
        }
        else{
            res.status(404).json({
                message:"role  not found..",
                data:null
            })
        }

    }catch(err){

        res.status(500).json({
            message:"error while ferching roles..",
            err:err
        })
    }


}

module.exports ={
    createRole,
    getRoles
}