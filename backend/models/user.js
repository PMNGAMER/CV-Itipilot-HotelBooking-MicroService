import mongoose from "mongoose";
const {Schema} = mongoose;

const UserSchema = new Schema({
  name: String,
  email: {type:String, unique:true},
  password: String,
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }], // Reference to Post model
  savedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SavedPost' }], // Reference to SavedPost model
  chats: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Chat' }], // Reference to Chat model
  chatIDs: [String]
},{timestamps:true});

const User = mongoose.model('User', UserSchema);
export default User;
