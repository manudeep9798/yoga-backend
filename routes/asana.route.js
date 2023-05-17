const userController = require('../controllers/asana.controller')
const express=require('express')
const Asana = require('../models/asanas.model')
const Flow = require('../models/flow.model')
const Class = require('../models/class.model')
const router = express.Router();


router.post('/add',userController.addAsana)
router.post('/find',userController.findAssanas)
router.put('/update',userController.updateAssana)
router.use(express.json()).delete('/delete/:id',async(req,res) => {
    const filter = {
    
        'assanas': { $elemMatch: { 'eachData.id': req.params.id } }
      };

    const resp = await Flow.find(filter).select("name")
    // const resps = Asana.findById(req.params.id)
    console.log(resp)
    res.send({resp})
})
router.use(express.json()).delete('/delete/:id/confirm',async(req,res) => {
    console.log(req.params.id)
    const filter = {
    
        'assanas': { $elemMatch: { 'eachData.id': req.params.id } }
      };
    const update = {
        $pull: {
            'assanas': { 'eachData.id': { $in: [ req.params.id ] } }
          }
      };
    const filterCls = {
    
        'flow.assanas': { $elemMatch: { 'eachData.id': req.params.id } }
      };
    const updateCls = {
        $pull: {
            'flow.assanas': { 'eachData.id': { $in: [ req.params.id ] } }
          }
      };

    const resp = await Flow.updateOne(filter,update)
    const respCls = await Class.updateOne(filterCls,updateCls)
    const resps = await Asana.findByIdAndRemove(req.params.id)

    console.log(resp)
    res.send({resp,resps})
})

module.exports = router