const express = require('express')
const router = express.Router()
const Grocery = require('../models/grocery')

//getting all grocery obj
router.get('/', async (request, respond) => {
    try{
        const groceries = await Grocery.find()
        respond.status(200).send(groceries)
    }catch(err){
        respond.status(500).json({message: err.message})
    }
    respond.send("Getting all data")
})

//getting one grocery obj
router.get('/:id', async (request, respond) => {
    try{
        const grocery = await Grocery.findById(request.params.id)
        respond.status(200).send(grocery)
    }catch(err){
        respond.status(400).send({message: err.message})
    }
})

//creating one grocery obj
router.post('/', async (request, respond) => {
    const grocery = new Grocery({
        name: request.body.name,
        category: request.body.category,
        quantity: request.body.quantity,
        cost: request.body.cost
    })
    try{
        const newGrocery = await grocery.save()
        //201 - object created
        respond.status(201).json(newGrocery)
    }catch(err){
        respond.status(400).json({message: err.message})
    }    
})

//deleting  grocery obj
router.delete('/:id', async (request, respond) => {
    try{
        const deletedItem = await Grocery.remove({_id : request.params.id})
        respond.status(200).send(deletedItem)
    }catch(err){
        respond.status(400).send({message: err.message})
    }
})

//updating current grocery obj
router.put('/:id', async (request, respond) => {
    try{
        const updatedItem = await Grocery.updateMany({_id : request.params.id},{ $set: {name: request.body.name}})
        respond.status(200).send(updatedItem)
    }catch(err){
        respond.status(400).send({message: err.message})
    }
})

module.exports = router