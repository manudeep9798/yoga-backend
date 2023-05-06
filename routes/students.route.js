const userController = require('../controllers/students.users.controller')

const express=require('express')
const router = express.Router();


router.post('/register',userController.register)
router.post('/login',userController.login)
router.post('/user-profile',userController.verifyLogin)
router.get('/bookings',userController.BookingDetails)

module.exports = router