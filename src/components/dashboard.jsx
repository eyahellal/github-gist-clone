import { BsCodeSquare } from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";

export default function Dashboard() {
  const location = useLocation();

  return (
    <div>
      <div className="flex flex-col gap-5">
        <div className="flex gap-3 items-center px-3 py-5  border-gray-200">
          <BsCodeSquare className="h-6 w-6" />
          <h2 className="text-2xl">Discover Gists</h2>
        </div>
        <div className="flex gap-3 ml-3">
          <Link to="/allGists">
            <button
              className={`px-4 py-2 ${
                location.pathname === "/allGists" ? "border-b-2 border-orange-800" : "border-b-2 border-transparent"
              }`}
            >
              All gists
            </button>
          </Link>
          <Link to="/starred">
            <button
              className={`px-4 py-2 ${
                location.pathname === "/starred" ? "border-b-2 border-orange-800" : "border-b-2 border-transparent"
              }`}
            >
              Starred
            </button>
          </Link>
          <Link to="/forked">
            <button
              className={`px-4 py-2 ${
                location.pathname === "/forked" ? "border-b-2 border-orange-800" : "border-b-2 border-transparent"
              }`}
            >
              Forked
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
