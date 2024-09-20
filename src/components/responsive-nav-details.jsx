import { useContext } from "react"
import { AuthContext } from "../contexts/auth"
import { Link } from "react-router-dom"
import { IoIosLogOut } from "react-icons/io";
import UserImg from "../assets/utilisateur.png"; // Assuming you're using this image somewhere



export default function ResponsiveNavDetail(props){
    const auth=useContext(AuthContext)
    return(
        <div className="md:hidden flex flex-col  items-center gap-2 bg-custom-blue px-3 py-2">
        <input
          type="text"
          placeholder="Search..."
          className="border bg-transparent w-full mb-3 rounded-md"
        />
        <Link to="/allGists" className="block py-1 font-semibold">
          All Gists
        </Link>
        <Link to="/" className="block py-1 font-semibold">
          Back to Github
        </Link>
        <Link to="/userProfile">
        <button
              className=" py-1 font-semibold block"
            >
        <div className="flex items-center gap-2">
            
          <img src={UserImg} alt="user" className="h-6 w-6" />

             {auth?.user?.displayName}
           

             </div>
             </button>
             <button
            onClick={ props.handleLogout}
            className="block py-1 font-semibold"
          >
              <div className="flex items-center gap-2">
            <IoIosLogOut className="h-6 w-6"/>

             
            Logout
            </div>
          </button>
         
          </Link>
      </div>
    )
}