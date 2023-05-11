const mongoose = require('mongoose');

const {Schema}= mongoose;

const asanaSchema=new Schema({
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true
    },
    catergory:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    author:{
        type:String,
    },
    level:{
        type:String,
    },
    muscles:{
        type:String,
    },
    date:{
        type:Date,
        default:Date.now()
    }
})

asanaSchema.set("toJSON",{
    transform:(document,returnObject)=>{
        returnObject.id=returnObject._id.toString();
        delete returnObject._id;
        delete returnObject._v;
        delete returnObject.password;
    }
})

const AsanaSchema= mongoose.model("asanas",asanaSchema);
module.exports=AsanaSchema