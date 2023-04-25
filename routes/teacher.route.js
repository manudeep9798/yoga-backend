const userController = require('../controllers/teacher.user.controller')

const express=require('express')
const router = express.Router();


router.post('/register',userController.register)
router.post('/login',userController.login)
router.post('/user-profile',userController.verifyLogin)
router.post('/findAuthor',userController.findAuthor)

module.exports = router