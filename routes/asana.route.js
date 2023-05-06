const userController = require('../controllers/asana.controller')

const express=require('express')
const router = express.Router();


router.post('/add',userController.addAsana)
router.post('/find',userController.findAssanas)
router.put('/update',userController.updateAssana)

module.exports = router