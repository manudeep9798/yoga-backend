const mongoose = require('mongoose');

const {Schema}= mongoose;

const flowSchema=new Schema({
    name:{
        type:String,
        required:true,
    },
    assanas:{
        type:Array,
        required:true
    },
    createdBy:{
        type:String
    },
    difficulty:{
        type:String
    }
})

flowSchema.set("toJSON",{
    transform:(document,returnObject)=>{
        returnObject.id=returnObject._id.toString();
        delete returnObject._id;
        delete returnObject._v;
        delete returnObject.password;
    }
})

const FlowSchema= mongoose.model("Flow",flowSchema);
module.exports=FlowSchema