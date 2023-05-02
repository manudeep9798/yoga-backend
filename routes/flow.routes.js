const userController = require('../controllers/flow.controller')

const express=require('express')
const router = express.Router();


router.post('/add',userController.addFlow)
router.get('/find',userController.getFlows)
router.post('/findOne',userController.getOneFlow)
// router.get('/find',userController.findAssanas)
router.post('/findAuthor',userController.getAuthor)

module.exports = router