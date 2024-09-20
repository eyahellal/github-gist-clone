import { Link } from "react-router-dom";
import Logo from "./logo";
import { useContext, useState } from "react";
import { HiBars3 } from "react-icons/hi2";
import { FaGithub } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import { AuthContext } from "../contexts/auth";
import ResponsiveNavDetail from "./responsive-nav-details";


export default function NavBar(props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const auth=useContext(AuthContext)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const handleLogout = () => {
    auth.logout();
    setIsOpen(false); // Close dropdown after logout
  };

  return (
    <nav className=" p-4 bg-custom-blue md:p-0 ">
      {/* Navbar container */}
      <div className="flex items-center justify-between px-3 py-2">
        {/* Left Side: Toggle Button for mobile */}
        <div className=" sm: flex justify-between items-center w-full  md:hidden relative ">
          <button 
            type="button"
            className="text-white focus:outline-none "
            onClick={toggleMenu}
          >
            <HiBars3 className="h-6 w-6  " />
          </button>
          <Link to="/addGist">
            <FiPlus className="self-end absolute top-2 right-2" />
          </Link>
          {/* Add & Notification Buttons (mobile, right-aligned) */}
          <div className="flex items-center gap-3">
            <button className="text-white focus:outline-none">{/* Add Button */}</button>
            <button className="text-white focus:outline-none">{/* Notification Button */}</button>
          </div>
        </div>

        {/* Center: Logo and Search input (visible on desktop) */}
        <div className="hidden md:flex items-center gap-3">
          <Logo />
          <input
            type="text"
            placeholder="Search..."
            className="border bg-transparent h-min rounded-md hidden md:block"
          />
        </div>

        {/* Right side: Links and buttons for desktop */}
        <div className="hidden md:flex items-center gap-5">
          <Link to="/allGists" className="font-semibold">
            All Gists
          </Link>
          <Link to="/" className="font-semibold">
            Back to Github
          </Link>
          {props.children}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
       <ResponsiveNavDetail handleLogout={handleLogout}/>
      )}
    </nav>
  );
}