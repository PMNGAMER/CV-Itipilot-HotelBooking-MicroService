import "../styles/singlePage.scss";
import {useState } from "react";
import iaxios from "../axiosSetUp";
import { cookie } from "../cookie";
import { SingleImage } from "./imagePage";
function SinglePage({id}) {
  const [hotel, setHotelData] = useState(null);
  useEffect(() => {
    const fetchHotelData = async () => {
      const res = await iaxios.get("http://localhost:4800/hotels/" + id,{
        headers:{
          Authorization: `Bearer ${cookie.get('userid')}`,
        }
      });
      setHotelData(res.data);
    };
    fetchHotelData();
  }, [id]);
  return (
    <div className="singlePage">
      <div className="details">
        <div className="wrapper">
          <div className="info">
            <div className="top">
              <div className="post">
                <SingleImage imageId={hotel.imageId}></SingleImage>
                <div className="address">
                  <img src="/pin.png" alt="" />
                  <span>{hotel.address}</span>
                </div>
                <div className="price">$ {hotel.price}</div>
              </div>
              <div className="user">
                <span>{hotel.userId.name}</span>
                <span>{hotel.userId.phone}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="features">
        <div className="wrapper">
          <div className="sizes">
            <div className="size">
              <img src="/bed.png" alt="" />
              <span>{hotel.bedroom} beds</span>
            </div>
            <div className="size">
              <img src="/bath.png" alt="" />
              <span>{hotel.bathroom} bathrooms</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SinglePage;
