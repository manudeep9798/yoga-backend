const Classes=require('../models/class.model');


const addClass=async (data,callback)=>{
    try{
        const classes = new Classes(data);
        classes.save()
        .then((response) => {
            return callback(null,response)
        })
        .catch((err) => {
            return callback(err)
        })

    }catch(err){
        return callback({
            message:err.message,
        },null)
    }
    
}
const getClass=(data,callback)=>{
    try{
        const classes = Classes.find()
        .then((response) => {
            return callback(null,response)
        })
        .catch((err) => {
            return callback(err)
        })

    }catch(err){
        return callback({
            message:err.message,
        },null)
    }
    
}

module.exports ={
    addClass,
    getClass
}