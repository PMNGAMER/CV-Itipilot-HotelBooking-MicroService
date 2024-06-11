// Assuming you already have Mongoose connected to your MongoDB instance
const Location = require('./models/Location'); // Import your Mongoose model for locations

// Function to find locations near a specific place
async function findLocationsNear(latitude, longitude, radiusInKm) {
    // Define a query to find locations within the specified radius using $geoWithin
    const query = {
        location: {
            $geoWithin: {
                $centerSphere: [[longitude, latitude], radiusInKm / 6378.1] // Earth radius in kilometers
            }
        }
    };

    try {
        // Perform the query to find locations near the specified coordinates
        const locations = await Location.find(query);
        return locations;
    } catch (error) {
        console.error('Error finding locations:', error);
        throw error; // Throw the error to handle it elsewhere
    }
}

// Example usage:
const latitude = 40.7128; // Example latitude
const longitude = -74.0060; // Example longitude
const radiusInKm = 10; // Example radius in kilometers

findLocationsNear(latitude, longitude, radiusInKm)
    .then(locations => {
        console.log('Locations near the specified place:', locations);
    })
    .catch(error => {
        console.error('Error finding locations near the specified place:', error);
    });
