const express = require('express')
const router = express.Router()

const noteControls = require('../controller/noteController')

// addNote
router.post("/AddNote", noteControls.addNote)

// deleteNote
router.delete("/Note/:id", noteControls.DeleteNote)

// editNote
router.patch("/Note/:id", noteControls.EditNote)


module.exports = router