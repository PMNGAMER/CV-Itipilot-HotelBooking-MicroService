import "./singlePage.scss";
import DOMPurify from "dompurify";
import {useState } from "react";
import axios from "axios";
import { cookie } from "../../cookie";
function SinglePage({id}) {
  const [post, setPostData] = useState(null);
  useEffect(() => {
    const fetchPostData = async () => {
      const res = await axios.get("http://localhost:4800/posts/" + id,{
        headers:{
          Authorization: `Bearer ${cookie.get('userid')}`,
        }
      });
      setPostData(res.data);
    };
    fetchPostData();
  }, [id]);
  return (
    <div className="singlePage">
      <div className="details">
        <div className="wrapper">
          <div className="info">
            <div className="top">
              <div className="post">
                <div className="address">
                  <img src="/pin.png" alt="" />
                  <span>{post.address}</span>
                </div>
                <div className="price">$ {post.price}</div>
              </div>
              <div className="user">
                <span>{post.user.username}</span>
              </div>
            </div>
            <div
              className="bottom"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(post.postDetail.desc),
              }}
            ></div>
          </div>
        </div>
      </div>
      <div className="features">
        <div className="wrapper">
          <div className="sizes">
            <div className="size">
              <img src="/bed.png" alt="" />
              <span>{post.bedroom} beds</span>
            </div>
            <div className="size">
              <img src="/bath.png" alt="" />
              <span>{post.bathroom} bathrooms</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SinglePage;
