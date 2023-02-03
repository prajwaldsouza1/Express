



const mongoose = require('mongoose');
const {Schema} = mongoose;

const StudentSchema = new Schema ({
    name:{
        type:String,
        reqired:true,
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
    date:{
        type:Date,
        reqired:true,
        default:Date.now,
    }
})
module.exports = mongoose.model("student",StudentSchema);









