const multer = require("multer")


//storage...
const storage = multer.diskStorage({
    destination:"./uploads",
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
})

const upload = multer({
    storage:storage,
    //fileFilter
}).single("file")

const uploadFile = (req,res)=>{

    upload(req,res,(err)=>{
        if(err){
            res.status(500).json({
                message:"error while uploading file..",
                err:err
            })
        }
        else{

            res.status(201).json({
                message:"file uploaded successfully..",
                data:req.file
            })
        }
    })

}
module.exports = {
    uploadFile
}