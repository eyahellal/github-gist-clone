import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/auth";
import Dashboard from "../components/dashboard";
import { useNavigate, Outlet } from "react-router-dom";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebase";

const listenForPublicGists = (setGists, setError, setLoading) => {
  const gistsCollection = collection(db, "gists");
  const forksCollection = collection(db, "forks"); // Forked gists collection
  const gistsQuery = query(gistsCollection, where("public", "==", true));
  const forksQuery = query(forksCollection, where("public", "==", true)); // Query forks

  // Set loading to true when starting to listen
  setLoading(true);

  // Listen for updates to public gists and forks
  const unsubscribeGists = onSnapshot(
    gistsQuery,
    (querySnapshot) => {
      const publicGists = [];
      querySnapshot.forEach((doc) => {
        publicGists.push({
          id: doc.id,
          ...doc.data(),
          forkedBy: null, // Original gists won't have a "forkedBy" attribute
        });
      });

      // Now listen for the forks and combine them with the original gists
      const unsubscribeForks = onSnapshot(
        forksQuery,
        (forksSnapshot) => {
          const forks = [];
          forksSnapshot.forEach((forkDoc) => {
            forks.push({
              id: forkDoc.id,
              ...forkDoc.data(),
              forkedBy: forkDoc.data().originalUser, // Add "forked by" information
            });
          });

          // Combine original gists and forks into one array
          const combinedGists = [...publicGists, ...forks];
          setGists(combinedGists); // Update gists state with combined data
          setLoading(false); // Set loading to false after data is loaded
        },
        (error) => {
          console.error("Error fetching forks: ", error);
          setError(error); // Handle errors for forks
          setLoading(false);
        }
      );

      return () => unsubscribeForks(); // Cleanup fork listener when needed
    },
    (error) => {
      console.error("Error fetching gists: ", error);
      setError(error); // Handle errors for gists
      setLoading(false);
    }
  );

  return () => unsubscribeGists(); // Cleanup gists listener when needed
};



export default function Layout(props) {
  const auth = useContext(AuthContext);
  const [gists, setGists] = useState([]);
  const [error, setError] = useState(null); // To handle any errors
  const [loading, setLoading] = useState(true); // To handle loading state
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = listenForPublicGists(setGists, setError, setLoading);
    navigate("/allgists"); // Redirect to /allgists

    return () => unsubscribe(); // Cleanup listener on unmount
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      {props.children}
      <Dashboard />
      <Outlet context={{ gists }} /> 
    </div>
  );
}
