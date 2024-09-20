import NavBar from "../components/navbar";
import Layout from "./layout";
import GuestNav from "../components/guestNav";
import NavDetails from "../components/nav-details";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../contexts/auth";

export default function Home() {
  const auth = useContext(AuthContext);

  return (
    <Layout>
      <NavBar >
        {auth.user !== null ? <NavDetails /> : <GuestNav />}
      </NavBar>
    </Layout>
  );
}
