import { Link } from "react-router-dom";
import { Avartar } from "./avatarPage";
import { useAuthContext } from "../context/UserContext";
function Navbar() {
  const {userDataFetch} = useAuthContext();
  return (
    <nav className="bg-white border-b rounded-lg border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center mr-3">
          <a href="/" className="flex items-center">
            <span className="text-blue-500 font-bold text-lg">Itipilot</span>
          </a>
        </div>
        <div className="flex items-center">
          <div className="flex items-center space-x-4">
            <Avartar imageId={userDataFetch.imageId} />
            <Link to="/profile" className="text-black hover:text-blue-500 font-semibold">
              <span>Profile</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
