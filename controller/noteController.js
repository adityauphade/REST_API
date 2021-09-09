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
    //getallNotes
    async getNote(request, response){
        let notes
        try{
            notes = await noteData.find()
            if(notes){
                log.info("GETTING NOTE DATA - TEST DONE")
                response.status(200).send(notes)
            }else{
                log.error("NO DATA FOUND")
                response.status(404).send(notes)
            }
        }catch(err){
            log.error("SERVER SIDE ERROR", err)
            response.status(500).send({message: err.message})
        }
    },
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
            response.status(201).json({ message: "Note Deleted"})
        }catch(err){
            log.error("NOTE NOT ADDED", err)
            response.status(400).json({ message: err.message })
        }
    },

    //editID
    async EditNote(request, response){
        try{ 
            // await editNote.save()
            log.info("NOTE UPDATED")
            const editNote = await noteData.updateMany({_id : request.params.id},{ $set: {...request.body}})
            response.status(201).json({ message: "Note Updated"})
        }catch(err){
            log.error("NOTE NOT EDITED", err)
            response.status(400).json({ message: err.message})
        }
    },
    
    //deleteID
    async DeleteNote(request, response){
        let deleteNote
        try{
            deleteNote = await noteData.updateOne({ _id: request.params.id}, { $set: {isDeleted: true}})
            if(deleteNote){
                log.info("NOTE DELETED")
                response.status(200).send(deleteNote)
            }else{
                log.error("NOTE NOT FOUND")
            }
        }catch(err){
            log.error("NOTE NOT DELETED", err)
            response.status(400).json({message: err.message})
        }
    },
    
    async ArchiveNote(request, response){
        let archiveNote
        try{
            archiveNote = await noteData.updateOne({ _id: request.params.id}, { $set: {isArchived: true}})
            if(archiveNote){
                log.info("NOTE ARCHIVED")
                response.status(200).send(archiveNote)
            }else{
                log.error("NOTE NOT FOUND TO BE ARCHIVED")
            }
        }catch(err){
            log.error("NOTE NOT ARCHIVED", err)
            response.status(400).json({message: err.message})
        }
    }
}



module.exports = noteControls