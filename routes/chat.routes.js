const express = require("express");
const { ChatModel } = require("../model/chat.model");

const chatRouter = express.Router();

// Create chat
chatRouter.post("/", async (req, res) => {
  const { firstId, secondId } = req.body;
  try {
    const chat = await ChatModel.findOne({
      members: { $all: [firstId, secondId] },
    });
    if (chat) {
      return res.status(200).send(chat);
    }
    const newChat = new ChatModel({
      members: [firstId, secondId],
    });
    await newChat.save();
    res.status(200).send({ message: "Chat created" });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});
// chatRouter.post("/", async (req,res) => {
//     const {firstId, secondId} = req.body;
//     try {
//         const chat = await ChatModel.findOne({
//             members : {$all: [firstId, secondId]}
//         })
//         if(chat) {
//             res.status(200).send(chat)
//         }
//         const newChat = new ChatModel({
//             members : [firstId, secondId]
//         })
//         await newChat.save()
//         res.status(200).send({ message : "chat created" })
//     } catch (error) {
//         res.status(400).send({ "error" : error })
//     }
// })

// find user chats
chatRouter.get("/:userID", async (req, res) => {
  const { userID } = req.params;
  try {
    const chats = await ChatModel.find({
      members: { $in: [userID] },
    });
    res.status(200).send(chats);
  } catch (error) {
    res.status(400).send({ error: error });
  }
});

// find chat single one to one
chatRouter.get("/find/:firstId/:secondId", async (req, res) => {
  const { firstId, secondId } = req.params;
  try {
    const chat = await ChatModel.findOne({
      members: { $all: [firstId, secondId] },
    });
    res.status(200).send(chat);
  } catch (error) {
    res.status(400).send({ error: error });
  }
});

module.exports = {
  chatRouter,
};
