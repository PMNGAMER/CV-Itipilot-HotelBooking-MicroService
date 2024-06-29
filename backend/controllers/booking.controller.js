import Booking from '../models/booking.js';
export const createBooking = async (req, res) => {
  const { price, address, city, bedroom, bathroom, name, email } = req.body;
  try {
    const newBooking = new Booking({
      price,
      address,
      city,
      bedroom,
      bathroom,
      name,
      email,
    });
    const savedBooking = await newBooking.save();
    res.status(201).json(savedBooking);
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ message: 'Failed to create booking' });
  }
};
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ message: 'Failed to fetch bookings' });
  }
};
export const getAllUserBookings = async (req, res) => {
    const { email } = req.params;
    try {
      const bookings = await Booking.find({email:email});
      res.status(200).json(bookings);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      res.status(500).json({ message: 'Failed to fetch bookings' });
    }
};  
export const deleteBooking = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedBooking = await Booking.findByIdAndRemove(id);
    if (!deletedBooking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.status(200).json({ message: 'Booking deleted successfully' });
  } catch (error) {
    console.error('Error deleting booking:', error);
    res.status(500).json({ message: 'Failed to delete booking' });
  }
};
