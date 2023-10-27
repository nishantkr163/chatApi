const express = require("express")
const { MessageModel } = require("../model/message.model");

const messsageRouter = express.Router()

// Create message

messsageRouter.post("/", async (req, res) => {
    const {chatId, senderId, text} = req.body;
    console.log(req.body)

    try {
        const message = new MessageModel({
            chatId,
            senderId,
            text
        })
        await message.save();
        res.status(200).send({ message : `${text} send to ${senderId}` })
    } catch (error) {
        res.status(400).send({ "error" : error })
    }
})

// Get message

messsageRouter.get("/:chatId", async (req, res) => {
    const {chatId} = req.params
    try {
        const messages = await MessageModel.find({chatId});
        res.status(200).send(messages)
    } catch (error) {
        res.status(400).send({ "error" : error })
    }
})

module.exports = {
    messsageRouter
}