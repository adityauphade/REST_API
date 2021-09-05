const mongoose = require('mongoose')

const grocerySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    cost: {
        type: Number,
        required: true,
    }
})

module.exports = mongoose.model('Grocery Orders', grocerySchema)