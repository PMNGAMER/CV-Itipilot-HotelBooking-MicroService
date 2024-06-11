import mongoose from "mongoose";
const messageSchema = new mongoose.Schema({
    text: String,
    userId: String,
    chat: { type: mongoose.Schema.Types.ObjectId, ref: 'Chat' },
    createdAt: { type: Date, default: Date.now },
  });
const Message = mongoose.model('Message', messageSchema);
export default Message;

