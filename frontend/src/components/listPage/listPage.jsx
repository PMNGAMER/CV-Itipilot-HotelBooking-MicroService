// ListPage.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import SinglePage from "../singlePage/singlePage";
import { cookie } from "../../cookie";
function ListPage() {
  const [postResponse, setPostResponse] = useState(null);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`http://localhost:4800/posts${window.location.search}`,{
          headers:{
            Authorization: `Bearer ${cookie.get('userid')}`,
          }
        });
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
        {postResponse.map((res)=><SinglePage id={res._id}></SinglePage>)}
      </div>
    </div>
  );
}
export default ListPage;
