const { express } = require("../db");
const { auth } = require("../middlewares/auth");
const { NotesModel } = require("../model/notes.model");

const notesRouter = express.Router();

notesRouter.use(auth)

notesRouter.post("/create", async (req, res) => {
    console.log(req.body)
    try {
        const note = new NotesModel(req.body)
        await note.save()
        res.status(200).send({ "message" : "New note added" })
    } catch (error) {
        res.status(400).send({ "error" : error })
    }
})

notesRouter.get("/", async (req, res) => {
    const {email} = req.body
    try {
        const notes = await NotesModel.find({email});
        res.status(200).send(notes)
    } catch (error) {
        res.status(400).send({"error" : error})
    }
})

notesRouter.patch("/update/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await NotesModel.findByIdAndUpdate({ _id: id }, req.body);
        res.status(200).send({ message: `Updated` });
    } catch (error) {
        res.status(400).send({ error: error });
    }
});

notesRouter.delete("/delete/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await NotesModel.findByIdAndDelete({ _id : id});
        res.status(200).send({ "message" : `Deleted` })
    } catch (error) {
        res.status(400).send({"error" : error})
    }
})

module.exports = {
    notesRouter
}