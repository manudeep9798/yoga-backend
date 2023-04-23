const mongoose = require('mongoose');

const {Schema}= mongoose;

const classSchema=new Schema({
    name:{
        type:String
    },
    difficulty:{
        type:String
    },
    limit:{
        type:Number
    },
    price:{
        type:Number
    },
    from:{
        type:String,
    },
    to:{
        type:String,
    },
    flow:{
        type:String
    },
    duration:{
        type:String
    },
    author:{
        type:String
    }
})

classSchema.set("toJSON",{
    transform:(document,returnObject)=>{
        returnObject.id=returnObject._id.toString();
        delete returnObject._id;
        delete returnObject._v;
        delete returnObject.password;
    }
})

const ClassSchema= mongoose.model("classes",classSchema);
module.exports=ClassSchema