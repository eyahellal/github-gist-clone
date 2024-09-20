import { useContext } from "react";
import User from "../components/user";
import GistDetails from "../components/gist-details";
import Gist from "../components/gist";
import { AuthContext } from "../contexts/auth";
import { auth, db } from "../firebase/firebase";
import { getDocs, where, collection, query } from "firebase/firestore";
import { useLoaderData } from "react-router-dom";



export async function loadMyForks() {
  const user = auth?.currentUser;
  

  if (!user?.uid) return { gists: [] }; 

 
  const forksCollection = collection(db, "forks");
  const q = query(forksCollection, where("userid", "==", user.uid));
  const querySnapshot = await getDocs(q);

  // Map each document to a gist object
  const gists = querySnapshot.docs.map((doc) => ({
    gistId: doc.id,
    ...doc.data(),
  }));

  return { gists }; // Return the gists array
}



export default function AllMyForks() {
  const { user } = useContext(AuthContext); // Get user from AuthContext
  const { gists } = useLoaderData(); // Load gists from loader data

  // Handle case where user is not authenticated
  if (!user) {
    return <div>Please log in to view your forked gists.</div>;
  }

  return (
    <div className="flex flex-col min-h-screen w-3/5 items-start">
      {gists.length > 0 ? (
        gists.map((gist) => (
          <div className="grow w-full" key={gist.gistId}>
            <div className="flex justify-between">
              {/* User Component - Displays gist details like name, username, creation date */}
              <User
                gistid={gist.gistId}
                gistname={gist.gistName}
                username={gist.originalUser || user.displayName} // Show original user's name if available
                creationDate={gist.creationDate}
              />

              {/* GistDetails Component - Displays stars, forks, comments */}
              <GistDetails
                stars={gist.stars}
                forks={gist.forks}
                files={gist.files}
                comments={gist.comments}
              />
            </div>

            {/* Gist Component - Displays the actual code of the gist */}
            <Gist code={gist.code} />
          </div>
        ))
      ) : (
        <div>No forked gists found.</div> // Message when no forked gists are found
      )}
    </div>
  );
}
