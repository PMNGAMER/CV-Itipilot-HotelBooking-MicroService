import { useState } from "react";
import "./searchBar.scss";
import { Link } from "react-router-dom";

function SearchBar() {
  const [query, setQuery] = useState({
    city: "",
    minPrice: "",
    maxPrice: "",
    bedroom: "",
    radiusInKm: "",
    bathroom: "",
  });
  const longtitude = 0;
  const latitude = 0;
  const handleChange = (e) => {
    setQuery((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  return (
    <div className="searchBar">
      <form>
        <input
          type="text"
          name="city"
          placeholder="City"
          value={query.city}
          onChange={handleChange}
        />
        <input
          type="number"
          name="minPrice"
          min={0}
          max={10000000}
          placeholder="Min Price"
          value={query.minPrice}
          onChange={handleChange}
        />
        <input
          type="number"
          name="maxPrice"
          min={0}
          max={10000000}
          placeholder="Max Price"
          value={query.maxPrice}
          onChange={handleChange}
        />
        <input
          type="number"
          name="bedroom"
          min={0}
          placeholder="Bedrooms"
          value={query.bedroom}
          onChange={handleChange}
        />
        <input
          type="number"
          name="bathroom"
          min={0}
          placeholder="Bathrooms"
          value={query.bathroom}
          onChange={handleChange}
        />
        <input
          type="number"
          name="radiusInKm"
          placeholder="Radius in Km"
          value={query.radiusInKm}
          onChange={handleChange}
        />
        <Link
          to={`/list?latitude=${latitude}&longtitude=${longtitude}&city=${query.city}&minPrice=${query.minPrice}&maxPrice=${query.maxPrice}&bedroom=${query.bedroom}&bathroom=${query.bathroom}&latitude=${query.latitude}&longitude=${query.longitude}&radiusInKm=${query.radiusInKm}`}
        >
          <button type="submit">
            <img src="/search.png" alt="Search" />
          </button>
        </Link>
      </form>
    </div>
  );
}

export default SearchBar;
