import mongoose from "mongoose";

// Define Mongoose schema for PostDetail
const postDetailSchema = new mongoose.Schema({
    desc: String,
    utilities: String,
    pet: String,
    income: String,
    size: Number,
    school: Number,
    bus: Number,
    restaurant: Number,
    post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', unique: true }, // Reference to Post model
  });
  


const PostDetail = mongoose.model('PostDetail', postDetailSchema);
// Define models based on schemas
export default PostDetail;


// Export models
