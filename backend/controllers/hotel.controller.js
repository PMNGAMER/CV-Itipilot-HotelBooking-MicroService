import Hotel from "../models/hotel.js";
import User from "../models/user.js";
const EARTH_RADIUS_KM = 6371;

export const getHotels = async (req, res) => {
  const query = req.body;
  try {
    const latitude = parseFloat(query.latitude);
    const longitude = parseFloat(query.longitude);
    const radiusInKm = parseFloat(query.radiusInKm);

    const deltaLongitude = Math.atan2(
      Math.sin(radiusInKm / EARTH_RADIUS_KM) * Math.cos(latitude * Math.PI / 180),
      Math.cos(radiusInKm / EARTH_RADIUS_KM) - Math.sin(latitude * Math.PI / 180) * Math.sin(latitude * Math.PI / 180)
    );
    const minLongitude = longitude - deltaLongitude * (180 / Math.PI);
    const maxLongitude = longitude + deltaLongitude * (180 / Math.PI);
    const deltaLatitude = (radiusInKm / EARTH_RADIUS_KM) * (180 / Math.PI);
    const minLatitude = latitude - deltaLatitude;
    const maxLatitude = latitude + deltaLatitude;

    // Construct the filter object
    const filter = {
      latitude: { $gte: minLatitude, $lte: maxLatitude },
      longitude: { $gte: minLongitude, $lte: maxLongitude },
    };

    // Add optional fields to the filter
    if (query.city && query.city !== "") {
      filter.city = query.city; // Add city directly if it exists and is not an empty string
    } else {
      filter.city = { $exists: true }; // Ensure city field exists in the documents
    }

    if (query.bedroom) {
      filter.bedroom = parseInt(query.bedroom); // Parse and add bedroom count if provided
    }

    // Handle price range query
    if (query.minPrice || query.maxPrice) {
      filter.price = {};
      if (query.minPrice) {
        filter.price.$gte = parseInt(query.minPrice); // Parse and add minimum price
      }
      if (query.maxPrice) {
        filter.price.$lte = parseInt(query.maxPrice); // Parse and add maximum price
      }
    }

    // Fetch hotels using the constructed filter
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
