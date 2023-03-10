const TeacherUser=require('../models/teacher.model');
const bcrypt = require('bcrypt');
const auth = require('../middlewares/auth');


async function login({email,password},callback){
    const user = await TeacherUser.findOne({email:email});
    if(user!=null){
        if(bcrypt.compareSync(password,user.password)){
            const token = auth.generateAccessToken(email);
            console.log(token)
            return callback(null, {...user.toJSON(),token});
        }
        else{
            return callback({
                message:"Invalid Username/Password!",
            })
        }
    }else{
        return  callback({
            message:"Invalid Username/Password!",
        })
    }
}


async function register(params,callback){
    if(params.username===undefined ){
        return callback({message:"Username is required"})
    }
    // const checkEmail = await TeacherUser.findOne({email:params.email})
    // console.log(checkEmail)
    // if(checkEmail)return callback({message:"Email already registered"})
    const user = new TeacherUser(params);
    user.save()
    .then((response) => {
        return callback(null,response)
    })
    .catch((err) => {
        return callback(err)
    })
}

module.exports ={
    login,
    register
}