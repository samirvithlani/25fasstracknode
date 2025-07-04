
//schema == zodSchema --> userValidationSceham

const zodMiddleware = (schema)=>async(req,res,next)=>{

    //userValidationSchema -- params == req.body match --parase..-->next
    //userValidationSchema -- params == req.body not match --no parase..-->catch
try{

    await schema.parseAsync(req.body)
    next()

}catch(err){

    res.status(500).json({
        message:"validation error",
        err:err
    })
}

}
module.exports = zodMiddleware