const zod = require("zod")

const userValidationSchema = zod.object({

    name:zod.string({message:"invalid data type.."}).min(2,"min 2 chr are required...").max(10).transform(val=>val.trim()),
    age:zod.number().refine(val=>val>=18,{message:"age must be >=18"}),
    gender:zod.string().default("male"),
    bloodGroup:zod.enum(["A+","B+","A-","O+"]),
    hobbies:zod.array(zod.string()),
    roleId:zod.string(),
    email:zod.string()
}).strict()

module.exports = userValidationSchema

