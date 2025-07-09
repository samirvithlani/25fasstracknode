const multer = require("multer")
const uploadToCloundinary = require("../utils/CloudinaryUtil")


//storage...
const storage = multer.diskStorage({
    destination:"./uploads",
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
})

const upload = multer({
    storage:storage,
    fileFilter:(req,file,cb)=>{
        if(file.mimetype ==="image/png" || file.mimetype ==="image/jpg" || file.mimetype ==="image/jpeg") {
            cb(null,true)
        }
        else{
            cb(new Error("Only images are allowd"),false)
        }
    }
}).single("file")

const uploadFile = async(req,res)=>{

    upload(req,res,async(err)=>{
        if(err){
            res.status(500).json({
                message:"error while uploading file..",
                err:err.message
            })
        }
        else{

            //cloundiary..
            const cloundinaryResponse = await uploadToCloundinary(req.file.path)
            res.status(201).json({
                message:"file uploaded successfully..",
                data:req.file,
                cloundinaryResponse:cloundinaryResponse
            })
        }
    })

}
module.exports = {
    uploadFile
}