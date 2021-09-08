const express = require('express')
const router = express.Router()

const noteControls = require('../controller/noteController')

//test
router.get("/Note", noteControls.getNote)

// addNote
router.post("/AddNote", noteControls.addNote)

// deleteNote
router.delete("/Note/Delete/:id", noteControls.DeleteNote)

// editNote
router.patch("/Note/Edit/:id", noteControls.EditNote)

// archiveNote
router.patch("/Note/Archive/:id", noteControls.ArchiveNote)


module.exports = router