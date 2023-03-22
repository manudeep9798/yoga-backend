const StudentUser=require('../models/student.model');
const bcrypt = require('bcrypt');
const auth = require('../middlewares/auth_student');


async function login({email,password},callback){
    const user = await StudentUser.findOne({email:email});
    if(user!=null){
        if(bcrypt.compareSync(password,user.password)){
            const token = auth.generateAccessToken(email);
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
    const user = new StudentUser(params);
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