import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
function SearchBar() {
  // function getCookie(name) {
  //   const cookieRegex = new RegExp(`(^|;)\\s*${name}\\s*=\\s*([^;]+)`);
  //   const cookieMatch = document.cookie.match(cookieRegex);
  //   return cookieMatch ? decodeURIComponent(cookieMatch[2]) : null;
  // }
  const [query, setQuery] = useState({
    city: "",
    minPrice: "",
    maxPrice: "",
    bedroom: "",
    radiusInKm: "",
    bathroom: "",
  });
  const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

  // const [longtitude, setLongtitude] = useState(null);
  // const [latitude, setLatitude] = useState(null);
  
  // useEffect(() => {
  //   const x = parseFloat(getCookie('x'));
  //   const y = parseFloat(getCookie('y'));
  //   if (x) {
  //     setLongtitude(parseFloat(x));
  //   }
  //   if (y) {
  //     setLatitude(parseFloat(y));
  //   }
  // }, []);

  // if (longtitude === null || latitude === null) {
  //   return <div>Loading...</div>;
  // }
  // console.log(longtitude," , ", latitude);
  const handleChange = (e) => {
    setQuery((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  return (
    <div className="searchBar bg-white shadow-lg rounded-lg p-6 max-w-4xl mx-auto">
      <form className="flex flex-wrap justify-between">
        <input
          type="text"
          name="city"
          className="flex-1 mr-1 mt-1 px-4 h-2/5 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="City"
          value={query.city}
          onChange={handleChange}
        />
        <input
          type="number"
          name="minPrice"
          className="flex-1 mr-1 mt-1 px-4 h-2/5 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          min={0}
          max={10000000}
          placeholder="Min Price"
          value={query.minPrice}
          onChange={handleChange}
        />
        <input
          type="number"
          name="maxPrice"
          className="flex-1 mr-1 mt-1 px-4 h-2/5 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          min={0}
          max={10000000}
          placeholder="Max Price"
          value={query.maxPrice}
          onChange={handleChange}
        />
        <input
          type="number"
          name="bedroom"
          className="flex-1 mr-1 mt-1 px-4 h-2/5 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          min={0}
          placeholder="Bedrooms"
          value={query.bedroom}
          onChange={handleChange}
        />
        <input
          type="number"
          name="bathroom"
          className="flex-1 mr-1 mt-1 px-4 h-2/5 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          min={0}
          placeholder="Bathrooms"
          value={query.bathroom}
          onChange={handleChange}
        />
        <input
          type="number"
          name="radiusInKm"
          className="flex-1 mr-1 mt-1 px-4 h-2/5 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Km"
          value={query.radiusInKm}
          onChange={handleChange}
        />
        <Link
          to={`/list?latitude=${getRandomInt(1,100)}&longtitude=${getRandomInt(1,100)}&city=${query.city}&minPrice=${query.minPrice}&maxPrice=${query.maxPrice}&bedroom=${query.bedroom}&bathroom=${query.bathroom}&radiusInKm=${query.radiusInKm}`}
        >
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white ml-1 mt-1 font-bold py-2 px-4 rounded-lg flex items-center"
          >
            <img src="/search.png" alt="Search" className="h-6 mr-2" />
            Search
          </button>
        </Link>
      </form>
    </div>
  );
}

export default SearchBar;
