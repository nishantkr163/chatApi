const mongoose = require("mongoose");

const notesSchema = mongoose.Schema({
    title : String,
    body : String,
    userID : String,
    email : String
}, {
    timestamps: true,
    versionKey : false
});

const NotesModel = mongoose.model("notes", notesSchema)

module.exports = {
    NotesModel
}