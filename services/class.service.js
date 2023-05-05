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
        if(data.id){
            Classes.findById(ObjectId(data.id)).then((res)=>{
                return callback(null,{data:res})
             })
        }else{
            const classes = Classes.find({author:data.author})
            .then((response) => {
                return callback(null,response)
            })
            .catch((err) => {
                return callback(err)
            })
        }

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