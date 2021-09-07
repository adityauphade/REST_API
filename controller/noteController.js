const noteData = require('../models/noteModel')
// const { validationResult, check } = require("express-validator")
const log = require("../logger/loggerFunction")

//addNote
//take all data => post

//editNote
//take selected data(through id) => put with same data

//deleteNote
//take selected data(through id) => isDeleted: 1
let noteControls = {
    //add note
    async addNote(request, response){
        const newNote = new noteData({
            title: request.body.title,
            body: request.body.body,
            colour: request.body.colour,
            isArchived: request.body.isArchived,
            isDeleted: request.body.isDeleted,
        })
        console.log(newNote)
        try{
            await newNote.save()
            log.info("NOTE ADDED")
            response.status(201).json(newNote)
        }catch(err){
            log.error("NOTE NOT ADDED", err)
            response.status(400).json({ message: err.message })
        }
    },

    //editID
    async EditNote(request, response){
        try{ 
            // await editNote.save()
            log.info("NOTE ADDED")
            const editNote = await noteData.updateMany({_id : request.params.id},{ $set: {...request.body}})
            response.status(201).json(editNote)
        }catch(err){
            log.error("NOTE NOT ADDED", err)
            response.status(400).json({ message: err.message})
        }
    },
    
    //deleteID
    async DeleteNote(request, response){
        let deleteNote
        try{
            deleteNote = await noteData.remove({ _id: request.params.id})
            if(deleteNote){
                log.info("NOTE DELETED")
                response.status(200).send(deleteNote)
            }else{
                log.error("NOTE NOT FOUND TO BE DELETED")
            }
        }catch(err){
            log.error("NOTE NOT DELETED", err)
            response.status(400).json({message: err.message})
        }
    }
}



module.exports = noteControls