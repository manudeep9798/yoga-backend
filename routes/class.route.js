const userController = require('../controllers/class.controller')

const express=require('express')
const router = express.Router();


router.post('/add',userController.addClass)

module.exports = router