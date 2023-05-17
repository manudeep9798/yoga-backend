
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
            const classes = Classes.aggregate([
                {
                  $lookup: {
                    from: "teacherusers",
                    localField: "author",
                    foreignField: "email",
                    as: "auth"
                  }
                }
              ])
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
        var booking=[]
        var flag=false
        var bookingClasses=[]
        let limit;
        await Classes.find({_id:data.id}).then((response) => {
            booking=response[0].booked
            limit=response[0].limit
            // return callback(null,{data:response})
        })
        await Student.find({email:data.username}).then((response) => {
            bookingClasses=response[0].wishList
        })

        
        let list=booking.filter(e=>e==data.username)
        
        if(list.length>0){
            return callback(
               null,{message:"Already registered"}
            )
        }
       
        if(booking.length >= limit){
            return callback({
                message:"Class limit reached",
            },null)
        }

        if(booking.length >= limit){
            return callback({
                message:"Class limit reached",
            },null)
        }
        let currentClassTimeBeg;
        let currentClassTimeEnd;;
        await Classes.findOne({_id:data.id}).then(res=>{
            currentClassTimeBeg=new Date(res.from)
            currentClassTimeEnd=new Date(res.to)            
        })
        await Student.findOne({email:data.username}).then(res=>{
                Classes.find({_id:res.wishList}).then(response=>{
                    const array=response
                    array.forEach(ele=>{
                        const thisFrom=new Date(ele.from);
                        const thisTo=new Date(ele.to);
                        if(thisFrom<=currentClassTimeEnd&&thisFrom>=currentClassTimeBeg){
                                console.log("here1");
                                flag=true
                        }else if(thisTo>=currentClassTimeBeg&&thisTo<=currentClassTimeEnd){
                                    console.log("here2");
                                    flag=true
                        }
                    })
                }).then(() => {
                    if(flag==true){
                        return callback(null,{data:"coinciding class time"})
                    }else{
                        Classes.findOneAndUpdate({_id:data.id},{
                            $set:{"booked":[...booking,data.username]}
                            
                        }).then((response) => {
                            Student.findOneAndUpdate({email:data.username},{
                                $set: { wishList: [...bookingClasses,data.id] } 
                            }).then(res=>{
                             
                           return callback(null,{data:response})
                            })
                        })
                    }
                })

        })
    }catch(err){
        return callback({
            message:err.message,
        },null)
    }
    }

const deleteClass=(data,callback)=>{
    try{
            console.log(data);
            Classes.deleteOne({_id:data.id}).then(response=>{
                return callback(null,response)
            }).catch(error=>{
                return callback(error,null)
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
    updateClassBooking,
    deleteClass
}