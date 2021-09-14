const express = require('express')
const router = express.Router()

const noteControls = require('../controller/noteController')
const tokenFunctions = require('../util/auth')


//test
router.get("/Note", tokenFunctions.verifyToken, noteControls.getNote)

// addNote
router.post("/AddNote", tokenFunctions.verifyToken, noteControls.addNote)

// deleteNote
router.delete("/Note/Delete/:id", tokenFunctions.verifyToken, noteControls.DeleteNote)

// editNote
router.patch("/Note/Edit/:id", tokenFunctions.verifyToken, noteControls.EditNote)

// archiveNote
router.patch("/Note/Archive/:id", tokenFunctions.verifyToken, noteControls.ArchiveNote)

//getALLArchived
router.get("/Note/Archive", tokenFunctions.verifyToken, noteControls.getArchived)

//getALLDeleted
router.get("/Note/Trash", tokenFunctions.verifyToken, noteControls.getDeleted)

module.exports = router