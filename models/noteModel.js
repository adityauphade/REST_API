const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true, 
    },
    body: {
        type: String,
        required: true,
    },
    colour: {
        type: String,
        required: false,
    },
    isArchived: {
        type: Boolean,
        required: false,
        default: false
    },
    isDeleted: {
        type: Boolean,
        required: false,
        default: false
    }
})

module.exports = mongoose.model('Note Details', noteSchema)