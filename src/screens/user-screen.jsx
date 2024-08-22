import { Link, useLoaderData } from "react-router-dom";

import Logout from "../components/logout";
import Layout from "./layout";
import NavBar from "../components/navbar";
import NavDetails from "../components/nav-details";

export async function userLoader({ params }) {
  return { userId: params.userId };
}

export default function UserScreen() {
  const { userId } = useLoaderData();
  console.log(userId);

  return (
    <Layout>
      <NavBar>
     <NavDetails/>
      </NavBar>
        <Logout />
    </Layout>
  );
}
