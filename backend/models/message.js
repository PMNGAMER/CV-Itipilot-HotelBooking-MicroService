import mongoose from "mongoose";

// Define Mongoose schema for Message
const messageSchema = new mongoose.Schema({
    text: String,
    userId: String,
    chat: { type: mongoose.Schema.Types.ObjectId, ref: 'Chat' }, // Reference to Chat model
    createdAt: { type: Date, default: Date.now },
  });


const Message = mongoose.model('Message', messageSchema);

export default Message;

