import mongoose from "mongoose";

// Define models based on schemas

const chatSchema = new mongoose.Schema({
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Reference to User model
    createdAt: { type: Date, default: Date.now },
    seenBy: [String],
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }], // Reference to Message model
    lastMessage: String
});
const Chat = mongoose.model('Chat', chatSchema);
export default Chat;
