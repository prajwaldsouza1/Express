const Student = require('../model/student.js')

const express = require('express')

const {body,validationResult}=require('express-validator');
const { modelName } = require('../model/student.js');


//insert

const Insert = async(req, res)=>{                                                                     //destructure req,body,front end values inserted here
    try{
         const{name,phone,email,address}=req.body;    

const student = new Student({
    name,
    phone,
    email,
    address,

   })
let checkEmail=await Student.findOne({email})
if(checkEmail){
    const success=false;
    console.log(checkEmail)
    return res.status(400).json({success,errors:"email already exits"})
}
// using this function to print error
const errors=validationResult(req)
if(!errors.isEmpty()){
    const success=false;
    return res.status(400).json({success,errors:errors.array() })
}


    const SavedStudent = await student.save()
    res.send(SavedStudent);
    }
    catch (error){
        console.error(error.message);
        res.status(500).send("Internal some error occured");
    }
}



//retrive

const Get_Student = async(req,res)=>{                     //javascript function to wait= asynk and await
    try{
        const student=await Student.find();//schema
        res.json(student)//student is avariable, u also write "send"//json converts the values to jason
    }

    
    catch (error){
        console.error(error.message);
        res.status(500).send("Internal some error occured");
}
}



//delete


const Delete=async(req,res)=>{                     //javascript function to wait= asynk and await
    try{
        let student =await Student.findById(req.params.id);
        if(!student){
            return res.status(404).send("Not found");
        }
        student =await Student.findByIdAndDelete(req.params.id);
        res.json({"Success":"student deleted successfully",student:student})
    }
    catch (error){
        console.error(error.message);
        res.status(500).send("Internal some error occured");
}
}



//update
const Update=async(req,res)=>{
    const errors=validationResult(req);

    const {name,phone,email,address}=req.body;
    try{                                                          //exception handler try and catch; exception=errors
        const newStudent={};                                      //newstudent is a object
        if(name){newStudent.name=name};
        if(phone){newStudent.phone=phone};
        if(email){newStudent.email=email};
        if(address){newStudent.address=address};


        let student =await Student.findById(req.params.id);
        if(!student){
            res.status(404).send("Not found");
        }

         student =await Student.findByIdAndUpdate(req.params.id,{
            $set:newStudent },{  new:true  })
            res.json({student});
        }
        catch (error){
        console.error(error.message);

        res.status(500).send("Internal some error occured");
    }
}



//single student

const Get_Single_Student=async(req,res)=>{                     //javascript function to wait= asynk and await
    try{
        let student =await Student.findById(req.params.id);
        if(!student){
            res.status(404).send("Not found");
        }
       
        res.json(student)
    }
    catch (error){
        console.error(error.message);
        res.status(500).send("Internal some error occured");
}
}





module.exports={Insert,Get_Student,Delete,Update, Get_Single_Student}