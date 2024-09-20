import { BsCodeSquare } from "react-icons/bs";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { CiStar } from "react-icons/ci";
import { IoIosGitNetwork } from "react-icons/io";
import { AuthContext } from "../contexts/auth";

export default function Dashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const auth = useContext(AuthContext);


  useEffect(() => {
    // Check if the user is logged in and if the current pathname matches the user's profile
    if (auth.user && location.pathname === `/${auth.user.uid}`) {
      navigate("/starred");
    }
  }, [auth.user, location.pathname, navigate]);

  return (
    <div>
      <div className="flex flex-col gap-5">
        <div className="flex gap-3 items-center px-3 py-5 border-gray-200">
          <BsCodeSquare className="h-6 w-6" />
          <h2 className="text-2xl">Discover Gists</h2>
        </div>
        <div className="flex gap-3 ml-3">
          <Link to="/allGists">
            <button
              className={`px-4 py-2 flex gap-2 items-center ${
                location.pathname === "/allGists"
                  ? "border-b-2 border-orange-800"
                  : "border-b-2 border-transparent"
              }`}
            >
              <BsCodeSquare className="h-4 w-4" />

              <p>All gists</p>
            </button>
          </Link>
          <Link to="/starred">
            <button
              className={`px-4 py-2 flex gap-2 items-center ${
                location.pathname === "/starred"
                  ? "border-b-2 border-orange-800"
                  : "border-b-2 border-transparent"
              }`}
            >
              <CiStar className="h-4 w-4" />

              <p>starred</p>
            </button>
          </Link>
          <Link to="/forked">
            <button
              className={`px-4 py-2 flex gap-2 items-center ${
                location.pathname === "/forked"
                  ? "border-b-2 border-orange-800"
                  : "border-b-2 border-transparent"
              }`}
            >
              <IoIosGitNetwork className="h-4 w-4" />

              <p>
                Forked
              </p>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
