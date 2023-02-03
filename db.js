

const mongoose = require('mongoose')
const mongoURL = "mongodb+srv://prajwal:prajwal18@cluster0.rrlklbk.mongodb.net/crud?retryWrites=true&w=majority"

const connectTOMongo =async () => {          //async and await javascript functionns
   
        try{
            await mongoose.connect(mongoURL)
            console.log("Connect to Mongo Successfully")
        }
        catch(err){
            console.log("Connect to Mongo failed",err)


         }
    }


module.exports = connectTOMongo







