import { Link, useLoaderData } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoMdArrowDropdown } from "react-icons/io";


import Logout from "../components/logout";
import Layout from "./layout";
import NavBar from "../components/navbar";
import UserImg from "../assets/utilisateur.png";

export async function userLoader({ params }) {
  return { userId: params.userId };
}

export default function UserScreen() {
  const { userId } = useLoaderData();
  console.log(userId);

  return (
    <Layout>
      <NavBar>
      <IoIosNotificationsOutline  className="h-6 w-6" />
<Link to="/addGist">
      <FiPlus />
      </Link>


        <img src={UserImg} alt="user" className="h-6 w-6" />
        <IoMdArrowDropdown />

      </NavBar>
        <Logout />
    </Layout>
  );
}
