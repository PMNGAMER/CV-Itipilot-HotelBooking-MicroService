import Chat from "../models/chat.js"
import  Message from "../models/message.js";
import cookie from "../cookie.js";
export const addMessage = async (req, res) => {
  const tokenUserId = JSON.parse(cookie.get('userData'))._id;
  const chatId = req.params.chatId;
  const text = req.body.text;

  try {
    // CHECK IF THE CHAT EXISTS AND THE USER IS A PART OF IT
    const chat = await Chat.findOne({
      _id: chatId,
      userIDs: tokenUserId,
    });

    if (!chat) return res.status(404).json({ message: "Chat not found!" });

    // CREATE A NEW MESSAGE AND SAVE TO DB
    const message = await Message.create({
      text,
      chatId,
      userId: tokenUserId,
    });

    // UPDATE CHAT'S SEENBY AND LASTMESSAGE FIELDS
    await Chat.findByIdAndUpdate(chatId, {
      seenBy: [tokenUserId],
      lastMessage: text,
    });

    res.status(200).json(message);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to add message!" });
  }
};
