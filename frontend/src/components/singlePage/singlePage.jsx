import "./singlePage.scss";
import DOMPurify from "dompurify";
import {useState } from "react";
import axios from "axios";
function SinglePage() {
  const [post, setPostData] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    const fetchPostData = async () => {
      const res = await axios.get("http://localhost:4800/posts/" + id);
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
              <img src="/size.png" alt="" />
              <span>{post.postDetail.size} sqft</span>
            </div>
            <div className="size">
              <img src="/bed.png" alt="" />
              <span>{post.bedroom} beds</span>
            </div>
            <div className="size">
              <img src="/bath.png" alt="" />
              <span>{post.bathroom} bathroom</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SinglePage;
