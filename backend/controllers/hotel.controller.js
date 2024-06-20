import Hotel from "../models/hotel.js";
import User from "../models/user.js";
const EARTH_RADIUS_KM = 6371;
export const getHotels = async (req, res) => {
  const query = req.body;
  console.log(query);
  try {
    const latitude = parseFloat(query.latitude);
    const longtitude = parseFloat(query.longtitude);
    const radiusInKm = parseFloat(query.radiusInKm);
    const deltaLongtitude = Math.atan2(
      Math.sin(radiusInKm / EARTH_RADIUS_KM) * Math.cos(latitude * Math.PI / 180),
      Math.cos(radiusInKm / EARTH_RADIUS_KM) - Math.sin(latitude * Math.PI / 180) * Math.sin(latitude * Math.PI / 180)
    );
    const minLongtitude = longtitude - deltaLongtitude * (180 / Math.PI);
    const maxLongtitude = longtitude + deltaLongtitude * (180 / Math.PI);
    const deltaLatitude = (radiusInKm / EARTH_RADIUS_KM) * (180 / Math.PI);
    const minLatitude = latitude - deltaLatitude;
    const maxLatitude = latitude + deltaLatitude;
    const filter = {
      latitude: { $gte: minLatitude, $lte: maxLatitude },
      longtitude: { $gte: minLongtitude, $lte: maxLongtitude },
      city: query.city || { $exists: true },
      bedroom: parseInt(query.bedroom) || { $exists: true },
      price: {
        $gte: parseInt(query.minPrice) || { $exists: true },
        $lte: parseInt(query.maxPrice) || { $exists: true }
      }
    };
    const hotels = await Hotel.find(filter);
    res.status(200).json(hotels);
  } catch (err) {
    console.error("Failed to get Hotels:", err);
    res.status(500).json({ message: "Failed to get Hotels" });
  }
};
export const getHotel = async (req, res) => {
  const id = req.params.id;
  try {
    const hotel = await Hotel.findById(id).populate({
      path: 'userId', 
      select: 'name', 
      model: 'User', 
    });
    if (!hotel) {
      return res.status(404).json({ message: 'Hotel not found' });
    }
    res.status(200).json(hotel);
  } catch (err) {
    console.error('Error fetching hotel:', err);
    res.status(500).json({ message: 'Failed to get hotel' });
  }
};
export const addHotel = async (req, res) => {
  const body = req.body;
  console.log(body);
  console.log("body ");
  const tokenUserId = req.user.userId;
  try {
    const newHotel = await Hotel.create({
      ...body,
      userId: tokenUserId,
    });
    const currentUser = await User.findById(tokenUserId);
    currentUser.hotels.push(newHotel._id);
    await currentUser.save();
    res.status(200).json(newHotel);
  } catch (err) {
    console.error('Failed to create Hotel:', err);
    res.status(500).json({ message: 'Failed to create Hotel' });
  }
};
export const deleteHotel = async (req, res) => {
  const hotelId = req.params.id;
  const tokenUserId = req.user.userId;
  try {
    const hotel = await Hotel.findById(hotelId);
    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }
    if (hotel.userId.toString() !== tokenUserId) {
      return res.status(403).json({ message: "Not Authorized!" });
    }
    await Hotel.findByIdAndDelete(hotelId);
    const currentUser = await User.findById(tokenUserId);
    if (!currentUser) {
      return res.status(404).json({ message: "User not found" });
    }
    currentUser.hotels = currentUser.hotels.filter(id => id.toString() !== hotelId);
    await currentUser.save();
    res.status(200).json({ message: "Hotel deleted" });
  } catch (err) {
    console.error('Failed to delete Hotel:', err);
    res.status(500).json({ message: "Failed to delete Hotel" });
  }
};
