

const Student = require('./model/student.js')
const connectTOMongo = require('./db.js')
const express = require('express')
const {body,validationResult}=require('express-validator')
const app = express();
const port = 5000;
const cors =require('cors')
app.use(express.json())

connectTOMongo();


app.use(cors({
    origin:"http://localhost:3001",
}))



app.get("/get/",(req, res)=>{
    console.log("hello")
res.send("Hello world")
})
app.get("/page/",(req, res)=>{
    console.log("hello good morning")
res.send("welcome to express")
})




app.use("/api/student",require("./router/student_route.js"))
                                                                                       //new route method add same api path
app.use("/api/employee/",require("./router/employee_route"))    //new route method add same api path

app.use('/api/teacher',require("./router/teacher_route"))











app.post("/api/student/insert",
[
    body('name',"name should contain min 3 char").isLength({min:3}),
    body('phone',"phone should contain min 10 num").isLength({min:10}),
    body('email',"email should contain min 5 char").isLength({min:5}),
    body('address',"address should contain min 5 char").isLength({min:5})

],

async(req, res)=>{                                                                     //destructure req,body,front end values inserted here
    try{
         const{name,phone,email,address}=req.body;    
         

// const name = "prajwal"
// const phone = 9900990099
// const email = "prajwal19@gmail.com"
// const address = "Mangalore"

const student = new Student({
    // name:req.body.name,
    // phone:req.body.phone,
    // email:req.body.email,
    // address:req.body.address,
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
})
//another api this api retrive data


app.get('/api/student/get_students',async(req,res)=>{                     //javascript function to wait= asynk and await
    try{
        const student=await Student.find();//schema
        res.json(student)//student is avariable, u also write "send"//json converts the values to jason
    }

    
    catch (error){
        console.error(error.message);
        res.status(500).send("Internal some error occured");
}
})

//this api is used for  delete data
app.delete('/api/student/delete_student/:id',async(req,res)=>{                     //javascript function to wait= asynk and await
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
})




// api to update values

app.put('/api/student/update_student/:id',async(req,res)=>{
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
})


app.listen(port, ()=>{
    console.log(`App listening on port ${port}`)
})