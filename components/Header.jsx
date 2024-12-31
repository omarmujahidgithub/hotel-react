import logo from "../assets/3.png";
import "../index.css";
import { useNavigate } from "react-router-dom";
import { FiPhone } from "react-icons/fi";

const Header = () => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/selection");
  };
  return (
    <header className="bg-[#1f4456] text-white flex items-center justify-between px-4 py-2 shadow-md">
      <div className="flex items-center">
        <FiPhone className="w-5 h-5 mr-2" aria-label="Phone Icon" />
        <span className="text-sm">0800 022 2822</span>
      </div>

      <div>
        <img src={logo} alt="Logo" className="h-20" />
      </div>

      <div>
        <button
          className="bg-white text-[#1f4456] font-bold py-2 px-4 rounded hover:bg-gray-200 transition"
          onClick={handleNavigate}
        >
          Book Now
        </button>
      </div>
    </header>
  );
};

export default Header;
