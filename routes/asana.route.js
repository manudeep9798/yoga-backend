const userController = require('../controllers/asana.controller')

const express=require('express')
const router = express.Router();


router.post('/add',userController.addAsana)
router.get('/find',userController.findAssanas)

module.exports = router