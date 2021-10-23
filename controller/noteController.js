const noteData = require('../models/noteModel')
const log = require("../logger/loggerFunction")

//addNote
//take all data => post

//editNote
//take selected data(through id) => put with same data

//deleteNote
//take selected data(through id) => isDeleted: 1
let noteControls = {
    //getallNotes
    async getNote(req, res){
        let notes
        try{
            notes = await noteData.find()
            if(notes){
                log.info("GETTING NOTE DATA - TEST DONE")
                res.status(200).json(notes)
            }else{
                log.error("NO DATA FOUND")
                res.status(404).json(notes)
            }
        }catch(err){
            log.error("SERVER SIDE ERROR", err)
            res.status(500).json({message: err.message})
        }
    },
    //add note
    async addNote(req, res){
        const newNote = new noteData({
            title: req.body.title,
            body: req.body.body,
            colour: req.body.colour,
            userID: req.body.userID,
            isArchived: req.body.isArchived,
            isDeleted: req.body.isDeleted,
        })
        console.log(newNote)
        try{
            await newNote.save()
            log.info("NOTE ADDED")
            res.status(201).json({ message: "Note Added"})
        }catch(err){
            log.error("NOTE NOT ADDED", err)
            res.status(400).json({ message: err.message })
        }
    },

    //editID
    async EditNote(req, res){
        try{ 
            // await editNote.save()
            log.info("NOTE UPDATED")
            const editNote = await noteData.updateMany({_id : req.params.id},{ $set: {...req.body}})
            res.status(201).json({ message: "Note Updated"})
        }catch(err){
            log.error("NOTE NOT EDITED", err)
            res.status(400).json({ message: err.message})
        }
    },
    
    //deleteID
    async DeleteNote(req, res){
        let deleteNote
        try{
            deleteNote = await noteData.updateOne({ _id: req.params.id}, { $set: {isDeleted: true}})
            if(deleteNote){
                log.info("NOTE DELETED")
                res.status(200).json({message: 'Note deleted successfully'})
            }else{
                log.error("NOTE NOT FOUND")
            }
        }catch(err){
            log.error("NOTE NOT DELETED", err)
            res.status(400).json({message: err.message})
        }
    },
    
    async ArchiveNote(req, res){
        let archiveNote
        try{
            archiveNote = await noteData.updateOne({ _id: req.params.id}, { $set: {isArchived: true}})
            if(archiveNote){
                log.info("NOTE ARCHIVED")
                res.status(200).json({message: 'Note archived successfully'})
            }else{
                log.error("NOTE NOT FOUND TO BE ARCHIVED")
            }
        }catch(err){
            log.error("NOTE NOT ARCHIVED", err)
            res.status(400).json({message: err.message})
        }
    },

    //getArchived
    async getArchived(req, res){
        try{
            let archivedNotes = await noteData.find({isArchived: 'true'})
            if(archivedNotes){
                log.info('ARCHIVED NOTES SENT SUCCESSFULLY')
                res.status(200).json(archivedNotes)
            }else{
                log.error('NO ARCHIVED NOTES FOUND')
                res.status(404).json({message: err.message})
            }
        }catch(err){
            log.error("SERVER SIDE ERROR", err)
            res.status(500).json({message: err.message})
        }
    },
    
    //getDeleted
    async getDeleted(req, res){
        try{
            let deletedNotes = await noteData.find({isDeleted: 'true'})
            if(deletedNotes){
                log.info('DELETED NOTES SENT SUCCESSFULLY')
                res.status(200).json(deletedNotes)
            }else{
                log.error('NO DELETED NOTES FOUND')
                res.status(404).json({message: err.message})
            }
        }catch(err){
            log.error("SERVER SIDE ERROR", err)
            res.status(500).json({message: err.message})
        }
    }
}



module.exports = noteControls