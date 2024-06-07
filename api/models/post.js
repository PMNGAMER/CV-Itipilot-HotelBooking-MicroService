import mongoose from "mongoose";

// Define Mongoose schema for Post
const postSchema = new mongoose.Schema({
    title: String,
    price: Number,
    images: [String],
    address: String,
    city: String,
    bedroom: Number,
    bathroom: Number,
    latitude: String,
    longitude: String,
    type: { type: String, enum: ['buy', 'rent'] }, // Enum for Type
    property: { type: String, enum: ['apartment', 'house', 'condo', 'land'] }, // Enum for Property
    createdAt: { type: Date, default: Date.now },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to User model
    postDetail: { type: mongoose.Schema.Types.ObjectId, ref: 'PostDetail' }, // Reference to PostDetail model
    savedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SavedPost' }] // Reference to SavedPost model
  });

const Post = mongoose.model('Post', postSchema);

// Define models based on schemas
export default Post;
