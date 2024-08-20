import { Link } from "react-router-dom";
import NavBar from "../components/navbar";
import Layout from "./layout";

export default function Home(){
    return(
        <Layout>
            <NavBar>
            <Link to="/login">
          <button className="font-semibold  p-1 ">sign in</button>
        </Link>
        <Link to="/register">
          <button className="font-semibold border border-slate-300 p-1  rounded-md">sign up</button>
        </Link>

            </NavBar>
        </Layout>
    )
}