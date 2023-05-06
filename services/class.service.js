const Classes=require('../models/class.model');
const Student=require('../models/student.model');


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
        if(data.author!==""){
            const classes = Classes.find()
            .then((response) => {
                return callback(null,response)
            })
            .catch((err) => {
                return callback(err)
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
const updateClass=(data,callback)=>{
try{
    console.log(data);
    Classes.findOneAndUpdate({_id:data.data.id},{
        $set:{"price":data.data.price,"name":data.data.name,
        "difficulty":data.data.level,"from":data.data.from,
        "to":data.data.to,"duration":data.data.duration,
        "limit":data.data.limit,"flow":data.data.flow}
    }).then((response) => {
        console.log("response",response);
        return callback(null,{data:response})
    })
}catch(err){
    return callback({
        message:err.message,
    },null)
}
}
const updateClassBooking=async(data,callback)=>{
    try{
        console.log(data);
        var booking=[]
        var bookingClasses=[]
        await Classes.find({_id:data.id}).then((response) => {
            booking=response[0].booked
            // return callback(null,{data:response})
        })
        await Student.find({email:data.username}).then((response) => {
            console.log("response",response[0].wishList);
            bookingClasses=response[0].wishList
            // return callback(null,{data:response})
        })
        Classes.findOneAndUpdate({_id:data.id},{
            $set:{"booked":[...booking,data.username],}
        }).then((response) => {
            Student.findOneAndUpdate({email:data.username},{
                $set: { wishList: [...bookingClasses,data.id] } 
            }).then(res=>{
                return callback(null,{data:response})
            })
        })
    }catch(err){
        return callback({
            message:err.message,
        },null)
    }
    }
module.exports ={
    addClass,
    getClass,
    updateClass,
    updateClassBooking
}