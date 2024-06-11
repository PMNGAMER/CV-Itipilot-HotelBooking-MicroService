import mongoose from "mongoose";
const savedPostSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, 
    post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' }, 
    createdAt: { type: Date, default: Date.now },
  });
const SavedPost = mongoose.model('SavedPost', savedPostSchema);
export default SavedPost;