import mongoose from "mongoose";
const chatSchema = new mongoose.Schema({
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], 
    createdAt: { type: Date, default: Date.now },
    seenBy: [String],
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }], 
    lastMessage: String
});
const Chat = mongoose.model('Chat', chatSchema);
export default Chat;
