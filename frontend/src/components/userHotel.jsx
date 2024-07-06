import { SingleImage } from "./imagePage";
function UserHotel({ hotel }) {
  return (
    <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
      {hotel && hotel.imageId ? (
        <SingleImage imageId={hotel.imageId} className="h-64 w-full object-cover" />
      ) : (
        <div className="h-64 w-full bg-gray-200 animate-pulse"></div>
      )}
      <div className="p-6 sm:p-8">
        <div className="flex items-center justify-between">
          <span className="text-gray-600 font-medium">
            {hotel ? hotel.address : "Loading..."}
          </span>
          <div className="text-2xl font-bold text-gray-800">
            $ {hotel ? hotel.price : "Loading..."}
          </div>
        </div>
        <div className="flex items-center space-x-4 mt-4">
          <div className="flex items-center space-x-2">
            <img src="/user.png" alt="" className="h-6 w-6" />
            <span className="text-gray-700">
              {hotel && hotel.userId ? hotel.userId.name : "Loading..."}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <img src="/phone.png" alt="" className="h-6 w-6" />
            <span className="text-gray-700">
              {hotel && hotel.userId ? hotel.userId.phone : "Loading..."}
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-4 mt-4">
          <div className="flex items-center space-x-2">
            <img src="/bed.png" alt="" className="h-6 w-6" />
            <span className="text-gray-700">
              {hotel ? hotel.bedroom + " beds" : "Loading..."}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <img src="/bath.png" alt="" className="h-6 w-6" />
            <span className="text-gray-700">
              {hotel ? hotel.bathroom + " bathrooms" : "Loading..."}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
export default UserHotel;
