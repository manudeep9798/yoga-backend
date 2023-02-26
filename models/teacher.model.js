const mongoose = require('mongoose');

const {Schema}= mongoose;

const uniqueValidator= require('mongoose-unique-validator');

const teacherSchema=new Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
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

teacherSchema.set("toJSON",{
    transform:(document,returnObject)=>{
        returnObject.id=returnObject._id.toString();
        delete returnObject._id;
        delete returnObject._v;
        delete returnObject.password;
    }
})

teacherSchema.plugin(uniqueValidator,{message:"Email already in use"});

const TeacherUser= mongoose.model("TeacherUser",teacherSchema);
module.exports=TeacherUser