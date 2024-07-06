import Navbar from "./Navbar";
import SearchBar from "./SearchBar";
import image from "../../public/background.jpg"
function Layout() {
  return (
    <div className="flex flex-col h-screen">
      <div className="bg-black shadow-md">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Navbar />
          <SearchBar />
        </div>
      </div>
      <img src={image} alt="Displayed Image" />
    </div>
  );
}
export { Layout };
