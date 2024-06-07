import mongoose from "mongoose";

// Define Mongoose schema for User
const userSchema = new mongoose.Schema({
    email: { type: String, unique: true },
    username: { type: String, unique: true },
    password: String,
    avatar: String,
    createdAt: { type: Date, default: Date.now },
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }], // Reference to Post model
    savedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SavedPost' }], // Reference to SavedPost model
    chats: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Chat' }], // Reference to Chat model
    chatIDs: [String]
  });

const User = mongoose.model('User', userSchema);
  // Define models based on schemas
export default User;
