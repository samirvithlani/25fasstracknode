const jwt = require("jsonwebtoken")
require("dotenv").config()

//auth -- Headers
const authMiddleware = (req,res,next)=>{
        //token pass..
        var token = req.headers.authorization
        if(token){

            //remove Bearer from token to verify..
            //Bearer klamlslkassalksamsklsa
            token = token.split(" ")[1]
            try{

                const dataFromtoken =jwt.verify(token,process.env.SECRET_KEY)
                //dataaFromtoken == {iat,eat,_id}->_database findByid() -->user
                //if user - next --> 
                //popuate role --> admin -->
                console.log(dataFromtoken)
                next() //controller

            }catch(err){
                res.status(401).json({
                    message:"unauthorized",
                    err:err
                })
            }

        }else{
            res.status(401).json({
                message:"token is not present.."
            })
        }

}

module.exports = authMiddleware