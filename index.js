const { express, connection } = require("./db");
const { chatRouter } = require("./routes/chat.routes");
const { messsageRouter } = require("./routes/message.router");
const { notesRouter } = require("./routes/notes.routes");
const { userRouter } = require("./routes/user.routes");
const cors = require("cors")

const app = express();
app.use(cors())
app.use(express.json())

app.use("/users", userRouter)
app.use("/notes", notesRouter)
app.use("/chat", chatRouter)
app.use("/message", messsageRouter)

const port = process.env.PORT || 8080;
app.listen(port, async () => {
    try {
        await connection
        console.log(`Server is running at ${port}`)
    } catch (error) {
        console.log("Error while connection", error)
    }
})