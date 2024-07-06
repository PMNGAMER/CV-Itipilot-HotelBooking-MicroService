import React, { useEffect, useState } from "react";
import iaxios from "../axiosSetUp";
import SinglePage from "./singlePage";
import { useAuthContext } from "../context/UserContext";
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
  console.log(postResponse);
  return (
    <div className="bg-black">
      {postResponse && postResponse.length > 0 ? (
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {postResponse.map((res) => (
              <SinglePage key={res._id} hotel={res} />
            ))}
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-screen">
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              No results found
            </h2>
            <p className="text-gray-600">
              Sorry, there are no results that match your search.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
export default ListPage;
