import mongoose from "mongoose";
const bookingSchema = new mongoose.Schema({
  price: Number,
  address: String,
  city: String,
  bedroom: Number,
  bathroom: Number,
  name: String,
  email: {type:String, unique:true},
});
const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;
