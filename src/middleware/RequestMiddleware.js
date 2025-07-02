const validateRequest = async(req,res,next)=>{

    const {name} = req.body
    //const name = req.body.name
    if(name){

        console.log("constraint passed...")
        next()
    }
    else{
        res.status(400).json({
            message:"bad request name is required..",
        })
    }


}

module.exports =validateRequest