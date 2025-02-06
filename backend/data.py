import User from "./models/user.js";
import Image from "./models/Image.js";
const imageUrls = [
    "1.jpeg",
    "2.jpeg",
    "3.jpeg",
    "4.jpeg",
    "5.jpeg",
    "6.jpeg",
    "7.jpeg",
    "8.jpeg",
    "9.jpeg",
    "10.jpeg",
];
const generateImageData = () => {
    const imageData = [];
    for (let i = 0; i < 10; i++) {
        const image = imageUrls[i % imageUrls.length]; // Cycling through sample URLs
        const imageEntry = { image };
        imageData.push(imageEntry);
    }
    return imageData;
};
const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
const generateRandomPhoneNumber = () => {
    const digits = Math.floor(Math.random() * 9000000000) + 1000000000;
    return digits;
};
const generateUsers = async () => {
    const users = [];
    const countries = ["USA", "Canada", "UK", "Australia", "Germany", "France", "Japan", "Brazil", "India", "South Africa"];
    const userTypes = ["ADMIN", "USER"];
    const imageIds = (await Image.find()).map(({_id})=>{
        return _id;
    })
    for (let i = 0; i < 20; i++) {
        const user= {
        imageId: imageIds[getRandomInt(0, imageIds.length - 1)],
        name: `User ${i + 1}`,
        email: `user${i + 1}@example.com`,
        password: `password${i + 1}`,
        country: countries[Math.floor(Math.random() * countries.length)],
        phone: generateRandomPhoneNumber(),
        longtitude: getRandomInt(0, 100),
        latitude: getRandomInt(0, 100),
        userType: userTypes[Math.floor(Math.random() * userTypes.length)],
        };
        users.push(user);
    }
    return users;
};
const generateHotels = async () => {
    const hotels = [];
    const userIds = (await User.find()).map(({ _id }) => _id); // Replace User with your actual User model
    const imageIds = (await Image.find()).map(({ _id }) => _id); // Replace Image with your actual Image model
    const countries = ["USA", "Canada", "UK", "Australia", "Germany", "France", "Japan", "Brazil", "India", "South Africa"];
    for (let i = 0; i < 500; i++) {
      const hotel = {
        imageId: imageIds[getRandomInt(0, imageIds.length - 1)],
        price: getRandomInt(50, 500), // Random price between 50 and 500
        address: `Address ${i + 1}`,
        city: "Random City",
        bedroom: getRandomInt(1, 5), // Random number of bedrooms between 1 and 5
        bathroom: getRandomInt(1, 3), // Random number of bathrooms between 1 and 3
        country: countries[Math.floor(Math.random() * countries.length)],
        latitude: getRandomInt(1, 100), // Random latitude
        longtitude: getRandomInt(1, 100), // Random longitude
        userId: userIds[getRandomInt(0, userIds.length - 1)],
      };
      hotels.push(hotel);
    }
    return hotels; // Assuming you want to insert these generated hotels into the database
};
const generateBookings = async () => {
    const bookings = [];
    const userIds = (await User.find()).map(({ _id }) => _id); // Replace User with your actual User model
    const cities = ["New York", "Los Angeles", "London", "Paris", "Tokyo", "Sydney", "Berlin", "Rome", "Toronto", "Moscow"];
    for (let i = 0; i < 20; i++) {
      const booking = {
        price: getRandomInt(50, 500), // Random price between 50 and 500
        address: `Address ${i + 1}`,
        city: cities[Math.floor(Math.random() * cities.length)],
        bedroom: getRandomInt(1, 5), // Random number of bedrooms between 1 and 5
        bathroom: getRandomInt(1, 3), // Random number of bathrooms between 1 and 3
        userId: userIds[getRandomInt(0, userIds.length - 1)],
        createdAt: new Date(),
      };
      bookings.push(booking);
    }
  
    return bookings; // Assuming you want to insert these generated bookings into the database
};
export {generateImageData, generateUsers, generateHotels, generateBookings}