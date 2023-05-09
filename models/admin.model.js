const mongoose = require('mongoose');

const {Schema}= mongoose;

const admin=new Schema({
    username:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    date:{
        type:Date,
        default:Date.now()
    }
})

admin.set("toJSON",{
    transform:(document,returnObject)=>{
        returnObject.id=returnObject._id.toString();
        delete returnObject._id;
        delete returnObject._v;
        delete returnObject.password;
    }
})

const AdminSchema= mongoose.model("Admin",admin);
module.exports=AdminSchema