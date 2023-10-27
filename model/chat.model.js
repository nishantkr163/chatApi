const mongoose = require("mongoose");


const chatSchema = mongoose.Schema({
    members : Array
},{
    timestamps : true,
    versionKey : false
})

const ChatModel = mongoose.model("chat", chatSchema)

module.exports = {
    ChatModel
}