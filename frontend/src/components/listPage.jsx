import React, { useEffect, useState } from "react";
import iaxios from "../axiosSetUp";
import SinglePage from "./singlePage";
import { useAuthContext } from "../context/UserContext";
import "../styles/listPage.scss"
function ListPage() {
  const [postResponse, setPostResponse] = useState([]);
  const {userDataFetch} = useAuthContext();
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
        console.log(city);
        console.log(minPrice);
        console.log(maxPrice);
        console.log(bedroom);
        console.log(latitude);
        console.log(longtitude);
        console.log(radiusInKm);
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
              Authorization: `Bearer ${userDataFetch._id}`,
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
      {postResponse && postResponse.length > 0 ? (
        <div className="listContainer">
          {postResponse.map((res) => (
            <SinglePage key={res._id} id={res._id} />
          ))}
        </div>
      ) : (
        <div style={{fontSize:'20px'
        }}>No results found</div>
      )}
    </div>
  );
}
export default ListPage;
