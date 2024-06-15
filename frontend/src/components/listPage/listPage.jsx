// ListPage.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import Filter from "../../components/filter/Filter";
function ListPage() {
  const [postResponse, setPostResponse] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`http://localhost:4800/posts${window.location.search}`); // Fetch posts with query parameters from URL
        setPostResponse(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, [window.location.search]); // Fetch data whenever URL query parameters change

  return (
    <div className="listPage">
      <div className="listContainer">
        <div className="wrapper">
          <Filter />
        </div>
      </div>
    </div>
  );
}

export default ListPage;
