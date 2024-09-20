import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMdArrowDropdown } from "react-icons/io";
import { useState } from "react";
import { AuthContext } from "../contexts/auth";

export default function NavDropdown() {
  const auth = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate(); 

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    auth.logout();
    navigate("/allGists")
    setIsOpen(false); // Close dropdown after logout
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={toggleDropdown}
        className="inline-flex items-center justify-center w-full rounded-md shadow-sm px-4 py-2 bg-transparent text-white font-medium hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
      >
        
        <IoMdArrowDropdown className="ml-2 h-5 w-5 text-white" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-black ring-1 ring-black ring-opacity-5 border border-gray-500/25">
          <div className="py-1">
            <Link to="/userProfile">
              <button
                className="block px-4 py-2 text-sm text-white hover:bg-gray-600 w-full text-left"
                onClick={() => setIsOpen(false)} // Close dropdown after navigation
              >
                Signed in as {auth?.user?.displayName}
              </button>
            </Link>
            <button
              onClick={handleLogout}
              className="block px-4 py-2 text-sm text-white hover:bg-gray-600 w-full text-left"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
