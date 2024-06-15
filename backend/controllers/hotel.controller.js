import Hotel from "../models/hotel.js";

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
    const Hotel = await Hotel.findById(id).populate({
      path: "user",
      select: "name phone",
      model: "User",
    });
    res.status(200).json({ ...Hotel._doc, isSaved: saved ? true : false });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get Hotel" });
  }
};
export const addHotel = async (req, res) => {
  const body = req.body;
  const tokenUserId = req.userData;
  try {
    const newHotel = await Hotel.create({
      ...body.hotelData,
      userId: tokenUserId,
    });
    res.status(200).json(newHotel);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to create Hotel" });
  }
};
export const deleteHotel = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userData;
  try {
    const hotel = await Hotel.findById(id);
    if (hotel.userId !== tokenUserId) {
      return res.status(403).json({ message: "Not Authorized!" });
    }
    await Hotel.findByIdAndDelete(id);
    res.status(200).json({ message: "Hotel deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to delete Hotel" });
  }
};
