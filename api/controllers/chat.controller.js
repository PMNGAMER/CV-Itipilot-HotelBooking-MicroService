import Chat  from "../models/chat.js"; // Assuming Chat and User models are imported correctly

export const getChats = async (req, res) => {
  const tokenUserId = req.userId;

  try {
    const chats = await Chat.find({
      userIDs: { $in: [tokenUserId] },
    }).populate({
      path: "users",
      select: "id username avatar",
    });

    res.status(200).json(chats);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get chats!" });
  }
};

export const getChat = async (req, res) => {
  const tokenUserId = req.userId;

  try {
    const chat = await Chat.findOne({
      _id: req.params.id,
      userIDs: tokenUserId,
    }).populate({
      path: "messages",
      options: { sort: { createdAt: "asc" } },
    });

    await Chat.findByIdAndUpdate(req.params.id, {
      $addToSet: { seenBy: tokenUserId },
    });

    res.status(200).json(chat);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get chat!" });
  }
};

export const addChat = async (req, res) => {
  const tokenUserId = req.userId;

  try {
    const newChat = await Chat.create({
      userIDs: [tokenUserId, req.body.receiverId],
    });

    res.status(200).json(newChat);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to add chat!" });
  }
};

export const readChat = async (req, res) => {
  const tokenUserId = req.userId;

  try {
    const chat = await Chat.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { seenBy: tokenUserId } },
      { new: true }
    );

    res.status(200).json(chat);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to read chat!" });
  }
};
