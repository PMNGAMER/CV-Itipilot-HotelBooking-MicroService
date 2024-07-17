import Hotel from "../models/hotel.js";
import User from "../models/user.js";

export const getHotels = async (req, res) => {
  const query = req.body;

  try {
    const latitude = query.latitude;
    const longtitude = query.longtitude;
    const radiusInKm = parseFloat(query.radiusInKm);
    console.log(latitude," ", longtitude);
    // Earth's radius in kilometers
    const EARTH_RADIUS_KM = 6371;

    // Convert radius from kilometers to radians
    const radiusInRadians = radiusInKm / EARTH_RADIUS_KM;

    // Calculate latitude bounds
    const minLatitude = latitude - (radiusInRadians * (180 / Math.PI));
    const maxLatitude = latitude + (radiusInRadians * (180 / Math.PI));

    // Calculate longtitude bounds
    const deltaLongtitude = Math.asin(Math.sin(radiusInRadians) / Math.cos(latitude * (Math.PI / 180)));
    console.log(deltaLongtitude);
    const minLongtitude = longtitude - (deltaLongtitude * (180 / Math.PI));
    const maxLongtitude = longtitude + (deltaLongtitude * (180 / Math.PI));
    console.log(minLatitude," ",maxLatitude);
    console.log(minLongtitude," ",maxLongtitude);
    const filter = {
      latitude: { $gte: minLatitude, $lte: maxLatitude },
      longtitude: { $gte: minLongtitude, $lte: maxLongtitude },
    };

    // Add optional fields to the filter
    if (query.city && query.city.trim() !== "") {
      filter.city = { $regex: query.city.trim(), $options: "i" }; // Case-insensitive regex for partial matching
    } else {
      filter.city = { $exists: true }; // Ensure city field exists in the documents
    }

    // Handle minimum bedroom and bathroom criteria
    if (query.bedroom) {
      filter.bedroom = { $gte: parseInt(query.bedroom) }; // Ensure at least 'query.bedroom' bedrooms
    } else {
      filter.bedroom = { $exists: true }; // Ensure bedroom field exists in the documents
    }

    if (query.bathroom) {
      filter.bathroom = { $gte: parseInt(query.bathroom) }; // Ensure at least 'query.bathroom' bathrooms
    } else {
      filter.bathroom = { $exists: true }; // Ensure bathroom field exists in the documents
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
    const hotels = await Hotel.find(filter).populate('userId');
    res.status(200).json(hotels);
  } catch (err) {
    console.error("Failed to get Hotels:", err);
    res.status(500).json({ message: "Failed to get Hotels" });
  }
};
export const getAllUserHotels = async (req, res) => {
  // const { userId } = req.params;
  try {
    const hotels = await Hotel.find({userId: (await User.findOne())._id }).populate('userId');
    res.status(200).json(hotels);
  } catch (error) {
    console.error('Error fetching Hotels:', error);
    res.status(500).json({ message: 'Failed to fetch Hotels' });
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
  // const tokenUserId = req.user.userId;
  try {
    const newHotel = await Hotel.create({
      ...body,
      userId: (await User.findOne())._id,
    });
    res.status(200).json(newHotel);
  } catch (err) {
    console.error('Failed to create Hotel:', err);
    res.status(500).json({ message: 'Failed to create Hotel' });
  }
};
export const deleteHotel = async (req, res) => {
  const hotelId = req.params.id;
  // const tokenUserId = req.user.userId;
  try {
    const hotel = await Hotel.findById(hotelId);
    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }
    if (hotel.userId.toString() !== (await User.findOne())._id) {
      return res.status(403).json({ message: "Not Authorized!" });
    }
    await Hotel.findByIdAndDelete(hotelId);
    res.status(200).json({ message: "Hotel deleted" });
  } catch (err) {
    console.error('Failed to delete Hotel:', err);
    res.status(500).json({ message: "Failed to delete Hotel" });
  }
};
