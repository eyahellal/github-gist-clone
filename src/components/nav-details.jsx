import UserImg from "../assets/utilisateur.png";
import { FiPlus } from "react-icons/fi";
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoMdArrowDropdown } from "react-icons/io";
import { Link } from "react-router-dom";



export default function NavDetails(){
    return(
        <>
         <IoIosNotificationsOutline  className="h-6 w-6" />
        <Link to="/addGist">
      <FiPlus />
      </Link>


        <img src={UserImg} alt="user" className="h-6 w-6" />
        <IoMdArrowDropdown />

        </>
    )
}