import mongoose from "mongoose";

// Define Mongoose schema for SavedPost
const savedPostSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to User model
    post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' }, // Reference to Post model
    createdAt: { type: Date, default: Date.now },
  });


const SavedPost = mongoose.model('SavedPost', savedPostSchema);

  // Define models based on schemas
export default SavedPost;

// Export models
  