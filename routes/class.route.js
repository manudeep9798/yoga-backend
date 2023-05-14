const userController = require('../controllers/class.controller')

const express=require('express')
const router = express.Router();


router.post('/add',userController.addClass)
router.post('/find',userController.getClass)
router.put('/update',userController.updateClass)
router.put('/updateBooking',userController.updateClassBooking)
router.put('/delete',userController.deleteClass)

module.exports = router