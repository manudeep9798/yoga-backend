const mongoose = require('mongoose');

const {Schema}= mongoose;

const uniqueValidator= require('mongoose-unique-validator');

const studentSchema=new Schema({
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
    wishList:{
        type:Array,
        default:[]
    },
    level:{
        type:String,
    },
    date:{
        type:Date,
        default:Date.now()
    },
    list:{
        type:Array,
       
    }
})

studentSchema.set("toJSON",{
    transform:(document,returnObject)=>{
        returnObject.id=returnObject._id.toString();
        delete returnObject._id;
        delete returnObject._v;
        delete returnObject.password;
    }
})

studentSchema.plugin(uniqueValidator,{message:"Email already in use"});

const StudentUser= mongoose.model("StudentUser",studentSchema);
module.exports=StudentUser