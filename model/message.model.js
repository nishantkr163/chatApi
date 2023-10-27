const mongoose = require("mongoose")

const messageSchema = mongoose.Schema({
    chatId : String,
    senderId : String,
    text : String
}, {
    timestamps : true,
    versionKey : false
})

const MessageModel = mongoose.model("message", messageSchema);

module.exports = {
    MessageModel
}