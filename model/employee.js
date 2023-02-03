const mongoose=require('mongoose')
const {Schema}=mongoose

const EmployeeSchema=new Schema({
    

    name:{
        type:String,
        required:true,

    },
   
    phone:{
        type:Number,
        reqired:true,
    },
    email:{
        type:String,
        reqired:true,
        unique:true,
    },
    address:{
        type:String,
        reqired:true,
    },
    empid:{
        type:Number,
        required:true,
    },
    salary:{
        type:Number,
        required:true,
    }
})

module.exports=mongoose.model("employee",EmployeeSchema)