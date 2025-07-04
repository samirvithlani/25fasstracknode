const zod = require("zod")

const userValidationSchema = zod.object({

    name:zod.string().min(2).max(10),
    age:zod.number(),
    gender:zod.string(),
    bloodGroup:zod.enum(["A+","B+","A-","O+"]),
    hobbies:zod.array(zod.string()),
    roleId:zod.string()
})

module.exports = userValidationSchema

