
const Student = require('../model/student.js')

const express = require('express')


const router=express.Router();

const {body,validationResult}=require('express-validator');








const {Insert,Get_Student,Update,Delete,Get_Single_Student} = require('../controller/student_controller')




router.post("/insert",
[
    body('name',"name should contain min 3 char").isLength({min:3}),
    body('phone',"phone should contain min 10 num").isLength({min:10}),
    body('email',"email should contain min 5 char").isLength({min:5}),
    body('address',"address should contain min 5 char").isLength({min:5})

],Insert)





 //another api this api retrive data


router.get('/get_students',Get_Student)







 //this api is used for  delete data

router.delete('/delete_student/:id',Delete)




 // api to update values

router.put('/update_student/:id',Update)





//  api to  get single stuent

router.get('/get_single/:id',Get_Single_Student)




module.exports=router










