const userController = require('../controllers/flow.controller')

const express=require('express')
const router = express.Router();


router.post('/add',userController.addFlow)
// router.get('/find',userController.findAssanas)

module.exports = router