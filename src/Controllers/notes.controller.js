const NotesModel = require("../models/notes.model");

const getNotes = async (req, res) => {
    const notes = await NotesModel.find({ userId: req.body.userId });
    return res.status(200).send(notes)

}

const createNote = async (req, res) => {
    const { heading, tag, description, userId } = req.body;

    const note = new NotesModel({
        heading,
        tag,
        description,
        userId,
    })

    try {
        await note.save();
        return res.status(200).send("Note Created")
    } catch (error) {
        console.log(error);
        return res.send(error.message);
    }

}

const deleteNote = async (req, res) => {
    const {noteId} = req.params
    const deleteNote = await NotesModel.findOneAndDelete({ _id: noteId, userId: req.body.userId });
    try {
        if (deleteNote) {
            return res.status(200).send("Note deleted..!")
        }else{
            return res.status(400).send("Unable to delete note.")

        }

    } catch (error) {
        return res.send(error.message)
    }


}

const updateNote = async (req, res) => {
    const {noteId} = req.params;
    const {heading, tag, description, userId} = req.body;
    const updateNote = await NotesModel.findOneAndUpdate({_id: noteId, userId: req.body.userId}, {
        heading,
        tag,
        description,
        userId
    });
    try {
       if(updateNote){
            await updateNote.save();
            return res.status(200).send("Notes updated.")
        } 
        else{
           return res.status(200).send("Unable to Update Notes.")

       }
    } catch (error) {
        return res.send(error.message)
    }

}



module.exports = { getNotes, createNote, deleteNote, updateNote }