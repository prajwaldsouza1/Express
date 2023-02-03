
const Employee = require('../model/employee.js')

const express = require('express')

const {body,validationResult}=require('express-validator');



//insert

const Insert=async(req, res)=>{                                                                     //destructure req.body,front end values inserted here
    try{
         const{name,phone,email,address,empid,salary}=req.body;    
         
const employee = new Employee({
    name,
    phone,
    email,
    address,
    empid,
    salary
   })
let checkEmail=await Employee.findOne({email})
if(checkEmail){
    const success=false;
    console.log(checkEmail)
    return res.status(400).json({success,errors:"email already exits"})
}
// using this function to print error
const errors=validationResult(req);
if(!errors.isEmpty()){
    const success=false;
    return res.status(400).json({success,errors:errors.array() })
}
 
    const SavedEmployee = await employee.save()
    res.send(SavedEmployee);
    }
    catch (error){
        console.error(error.message);
        res.status(500).send("Internal some error occured");
    }
}


//Retriev

const Retrive=async(req,res)=>{                     //javascript function to wait= asynk and await
    try{
        const employee=await Employee.find();//schema
        res.json(employee)//student is avariable, u also write "send"//json converts the values to jason
    }

    
    catch (error){
        console.error(error.message);
        res.status(500).send("Internal some error occured");
}
}


//delete

const Delete=async(req,res)=>{                     //javascript function to wait= asynk and await
    try{
        let employee =await Employee.findById(req.params.id);
        if(!employee){
            return res.status(404).send("Not found");
        }
        employee =await Employee.findByIdAndDelete(req.params.id);
        res.json({"Success":"employee deleted successfully",employee:employee})
    }
    catch (error){
        console.error(error.message);
        res.status(500).send("Internal some error occured");
}
}



//update

const Update=async(req,res)=>{
    const errors=validationResult(req);

    const {name,phone,email,address,empid,salary}=req.body;
    try{                                                          //exception handler try and catch; exception=errors
        const newEmployee={};                                      //newstudent is a object
      
        if(name){ newEmployee.name=name};
        if(phone){ newEmployee.phone=phone};
        if(email){newEmployee.email=email};
        if(address){ newEmployee.address=address};
        if(empid){ newEmployee.empid=empid};
        if(salary){ newEmployee.salary=salary};


        let employee =await Employee.findById(req.params.id);
        if(!employee){
            res.status(404).send("Not found");
        }

         employee =await Employee.findByIdAndUpdate(req.params.id,{
            $set:newEmployee },{  new:true  })
            res.json({employee});
        }
        catch (error){
        console.error(error.message);

        res.status(500).send("Internal some error occured");
    }
}

module.exports={Insert,Retrive,Delete,Update}
