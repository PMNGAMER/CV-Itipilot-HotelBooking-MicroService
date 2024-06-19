import "../styles/layout.scss";
import Navbar from "./Navbar";
import SearchBar from "./SearchBar";
function Layout() {
  return (
    <div className="layout">
      <div className="navbar">
        <Navbar />
      </div>
      <SearchBar/>
    </div>
  );
}
export { Layout };
