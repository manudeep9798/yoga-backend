const userController = require('../controllers/class.controller')
const User= require('../models/student.model')
const Class= require('../models/class.model')
const express=require('express')
const router = express.Router();


router.post('/add',userController.addClass)
router.post('/find',userController.getClass)
router.put('/update',userController.updateClass)
router.put('/updateBooking',userController.updateClassBooking)
router.put('/updateWishlist',async(req,res)=>{
    const get= await Class.findOne({_id:req.body.id})

   if(get.wishList.includes(req.body.username))
   return res.send({msg:"already added to wait list"})
    await Class.findOneAndUpdate({_id:req.body.id}, { $set: { wishList: req.body.username } })
    res.send({msg:"added to wait list"})
})
router.put('/delete',userController.deleteClass)



router.use(express.json()).put('/cancelBooking',async(req,res) => {
    await User.findOneAndUpdate({email:req.body.username}, { $pull: { wishList: req.body.id } })
    await Class.findOneAndUpdate({_id:req.body.id}, { $pull: { booked: req.body.username } })
    res.send("ok")
})

module.exports = router