import mongoose from "mongoose";
const {Schema} = mongoose;
const UserSchema = new Schema({
  name: String,
  email: {type:String, unique:true},
  password: String,
  hotels: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Hotel' }], 
  phone: Number,
  userType: String,
},{timestamps:true});
const User = mongoose.model('User', UserSchema);
export default User;
