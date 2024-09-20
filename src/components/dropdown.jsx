import { useState } from "react";
import { HiChevronDown } from "react-icons/hi"; // Import the icon from react-icons

export default function Dropdown({ onSecretGistClick, onPublicGistClick }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={toggleDropdown}
        className="inline-flex justify-center w-full rounded-md shadow-sm px-4 py-2 bg-green-700 text-white font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
      >
        Add Gist
        <HiChevronDown className="ml-2 h-5 w-5" /> {/* Use the imported icon here */}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-black ring-1 ring-black ring-opacity-5 border border-gray-500/25">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <button
              onClick={() => {
                onSecretGistClick();
                setIsOpen(false); 
              }}
              className="block px-4 py-2 text-sm text-white hover:bg-gray-600 w-full text-left"
            >
              Create Secret Gist
            </button>
            <button
              onClick={() => {
                onPublicGistClick();
                setIsOpen(false); 
              }}
              className="block px-4 py-2 text-sm text-white hover:bg-gray-600 w-full text-left"
            >
              Create Public Gist
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
