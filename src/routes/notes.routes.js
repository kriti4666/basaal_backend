const express = require("express");
const { getNotes, createNote, deleteNote, updateNote } = require("../Controllers/notes.controller");

const notesRoute = express.Router();

notesRoute.get("", getNotes);
notesRoute.post("/create", createNote);
notesRoute.put("/edit/:noteId", updateNote);
notesRoute.delete("/delete/:noteId", deleteNote);



module.exports = {
    notesRoute
};