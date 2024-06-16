import React, { useEffect, useState } from "react";
import iaxios from "../axiosSetUp";
import SinglePage from "./singlePage";
import { cookie } from "../cookie";
import "../styles/listPage.scss"
function ListPage() {
  const [postResponse, setPostResponse] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const city = params.get("city");
        const minPrice = params.get("minPrice");
        const maxPrice = params.get("maxPrice");
        const bedroom = params.get("bedroom");
        const bathroom = params.get("bathroom");
        const latitude = params.get("latitude");
        const longtitude = params.get("longtitude");
        const radiusInKm = params.get("radiusInKm");
        const response = await iaxios.post(
          `http://localhost:4800/hotels/search`,
          {
            city,
            minPrice,
            maxPrice,
            bedroom,
            bathroom,
            latitude,
            longtitude,
            radiusInKm,
          },
          {
            headers: {
              Authorization: `Bearer ${cookie.get("userid")}`,
            },
          }
        );
        setPostResponse(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [window.location.search]);
  return (
    <div className="listPage">
      <div className="listContainer">
        {postResponse.map((res) => (
          <SinglePage key={res._id} id={res._id} />
        ))}
      </div>
    </div>
  );
}
export default ListPage;
