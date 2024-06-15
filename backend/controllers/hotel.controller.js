import Hotel from "../models/hotel.js";
import User from "../models/user.js";
export const getHotels = async (req, res) => {
  const query = req.body;
  console.log('hotel endpoint');
  try {
    const latitude = parseFloat(query.latitude);
    const longitude = parseFloat(query.longitude);
    const radiusInKm = parseFloat(query.radiusInKm);
    const filter = {
      $geoWithin: {
        $centerSphere: [[longitude, latitude], radiusInKm / 6378.1]
      },
      city: query.city || undefined,
      bedroom: parseInt(query.bedroom) || undefined,
      price: {
        $gte: parseInt(query.minPrice) || undefined,
        $lte: parseInt(query.maxPrice) || undefined,
      },
    };
    const Hotels = await Hotel.find(filter);
    res.status(200).json(Hotels);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get Hotels" });
  }
};
export const getHotel = async (req, res) => {
  const id = req.params.id;
  try {
    const hotel = await Hotel.findById(id).populate({
      path: 'userId', 
      select: 'name phone', 
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
  const tokenUserId = req.userData;
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
  const tokenUserId = req.userData;
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
