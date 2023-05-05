const userController = require('../controllers/class.controller')

const express=require('express')
const router = express.Router();


router.post('/add',userController.addClass)
router.post('/find',userController.getClass)

module.exports = router