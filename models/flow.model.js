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
    level:{
        type:String,
    },
    duration:{
        type:String,
    },
    startTime:{
        type:String,
    },
    endTime:{
        type:String,
    },
    date:{
        type:Date,
        default:Date.now()
    },
    allowedLimit:{
        type:Number,
        required:true,
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