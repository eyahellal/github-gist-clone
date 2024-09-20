
import Layout from "./layout";
import NavBar from "../components/navbar";
import NavDetails from "../components/nav-details";
import { useContext } from "react";
import { AuthContext } from "../contexts/auth";
import GuestNav from "../components/guestNav";


export default function UserScreen() {
 const auth=useContext(AuthContext)
  
    return (
      <Layout>
        <NavBar>
          {auth.user!==null ? <NavDetails /> : <GuestNav/>}
        </NavBar>
      </Layout>
    );
  }

