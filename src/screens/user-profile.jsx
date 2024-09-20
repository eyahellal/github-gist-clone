import { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/auth";
import NavDetails from "../components/nav-details";
import NavBar from "../components/navbar";
import SideBar from "../components/sidebar";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { GoCodeSquare } from "react-icons/go";
import { IoIosGitNetwork } from "react-icons/io";



export default function UserProfile() {
  const location = useLocation();
  const navigate = useNavigate(); 
  const { user } = useContext(AuthContext); 

  useEffect(() => {
   
    if (location.pathname === `/userProfile`) {
      navigate("allmygists"); 
    }
  }, [location.pathname, navigate]);

  return (
    <>
      <NavBar>
        <NavDetails />
      </NavBar>
      <div className=" flex gap-4 shrink-0 mx-14 mt-8">
        <SideBar
          className="w-2/5"
          email={user.email}
          username={user.displayName}
          following={user.following}
          followers={user.followers}

        />
        <div className="w-full grow flex flex-col gap-4 shrink-0">
          <div className="flex gap-4">
          <Link to="allmygists">
            <button
              className={`px-4 py-2 ${
                location.pathname === `/userProfile/allmygists`
                  ? "border-b-2 border-orange-800"
                  : "border-b-2 border-transparent"
              } flex gap-3 items-center`}
            >
              <GoCodeSquare />

              All Gists

            </button>
          </Link>
          <Link to="myforked">
            <button
              className={`px-4 py-2 ${
                location.pathname === `/userProfile/myforked`
                  ? "border-b-2 border-orange-800"
                  : "border-b-2 border-transparent"
              } flex gap-3 items-center`}
            >
              <IoIosGitNetwork />

              Forked
            </button>

          </Link>
          </div>
          <Outlet context={{ user }} /> 

        </div>
      </div>
    </>
  );
}
