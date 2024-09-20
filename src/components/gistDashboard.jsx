import { useState, useEffect, useContext } from "react";
import { Link, useLocation, useParams, useNavigate } from "react-router-dom"; // Import useNavigate for redirect
import { doc, getDoc, collection, addDoc, increment, updateDoc, deleteDoc } from "firebase/firestore"; // Import Firestore methods
import { db } from "../firebase/firebase"; // Import your Firebase config
import { CiEdit } from "react-icons/ci";
import { IoIosGitBranch } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import { AuthContext } from "../contexts/auth";
import CollaboratorPopUp from "./collaborator-pop-up";

export default function GistDashboard() {
  const { userName, gistName, gistId } = useParams();
  const { user } = useContext(AuthContext); // Destructure user from AuthContext
  const location = useLocation();
  const navigate = useNavigate(); // For redirect after deletion
  const [gist, setGist] = useState(null); // State to store fetched Gist
  const [loading, setLoading] = useState(true); // State to handle loading
  const [isOpen,setOpen]=useState(false)


  const handleOpen= () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    const fetchGist = async () => {
      try {
        // Try fetching from the "gists" collection first
        const docRefGists = doc(db, "gists", gistId);
        const docSnapGists = await getDoc(docRefGists);

        let fetchedGist = null;

        if (docSnapGists.exists()) {
          fetchedGist = {
            ...docSnapGists.data(),
            gistId: docSnapGists.id,
            isFork: false, // Indicate that this is not a fork
          };
        } else {
          // If not found in "gists", try fetching from the "forks" collection
          const docRefForks = doc(db, "forks", gistId);
          const docSnapForks = await getDoc(docRefForks);

          if (docSnapForks.exists()) {
            fetchedGist = {
              ...docSnapForks.data(),
              gistId: docSnapForks.id,
              isFork: true,
            };
          } else {
            console.log("No such Gist or Fork found!");
          }
        }

        setGist(fetchedGist);
      } catch (error) {
        console.error("Error fetching Gist: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGist();
  }, [gistId]); // Fetch the Gist when gistId changes
  

  
    ;
  const forkHandler = async () => {
    try {
      if (gist) {
        const forkedGist = {
          ...gist,
          stars: gist.stars || 0,
          forks: gist.forks || 0,
          isFork: true,
          originalUser: gist.username, // Store the original user's name
          username: userName, // Change to the current user’s username
          creationDate: new Date().toISOString(), // Set the creation date to the current time
        };

        // Add the forked Gist to the "forks" collection in Firestore
        await addDoc(collection(db, "forks"), forkedGist);

        console.log("Gist successfully forked!");

        // Increment the forks count in the original Gist document
        const originalGistRef = doc(db, "gists", gist.gistId); // Get the reference to the original gist
        await updateDoc(originalGistRef, {
          forks: increment(1), // Increment the forks field by 1
        });

        console.log("Original Gist's forks count updated!");
      }
    } catch (error) {
      console.error("Error forking Gist: ", error);
    }
  };

  // Delete handler function
  const deleteHandler = async () => {
    try {
      if (gist) {
        const docRef = doc(db, gist.isFork ? "forks" : "gists", gistId); // Decide which collection to delete from (forks or gists)
        await deleteDoc(docRef); // Delete the gist from Firestore
        console.log("Gist deleted successfully!");

        // Redirect to a different page after deletion
        navigate("/"); // Redirect to the home page or another appropriate page
      }
    } catch (error) {
      console.error("Error deleting Gist: ", error);
    }
  };

  
  if (loading) {
    return <div>Loading...</div>; // Show a loading indicator
  }

  if (!gist) {
    return <div>Gist not found</div>; // Handle case where Gist is not found
  }

  return (
    <div className="flex gap-3 mt-10 justify-between">
      <div>
        <Link to={`/gistPage/${userName}/${gistName}/${gistId}/code`}>
          <button
            className={`px-4 py-2 ${
              location.pathname.includes(`${gistId}/code`)
                ? "border-b-2 border-orange-800"
                : "border-b-2 border-transparent"
            }`}
          >
            Code
          </button>
        </Link>
        <Link to={`/gistPage/${userName}/${gistName}/${gistId}/${gist.stars || 0}/stars`}>
          <button
            className={`px-4 py-2 ${
              location.pathname.includes(`/${gistId}/${gist.stars || 0}/stars`)
                ? "border-b-2 border-orange-800"
                : "border-b-2 border-transparent"
            }`}
          >
            Stars
          </button>
        </Link>
        <Link to={`/gistPage/${userName}/${gistName}/${gistId}/${gist.forks || 0}/forks`}>
          <button
            className={`px-4 py-2 ${
              location.pathname.includes(`/${gistId}/${gist.forks || 0}/forks`)
                ? "border-b-2 border-orange-800"
                : "border-b-2 border-transparent"
            }`}
          >
            Forks
          </button>
        </Link>
      </div>
      <div className="flex gap-6 items-end">
        <button className="p-1 border border-gray-700 rounded-lg flex gap-1 items-center bg-gray-800" onClick={forkHandler}>
          <IoIosGitBranch />
          Fork
        </button>
        {gist.userid === user?.uid && (
          <>
          <Link to={`/editGist/${gist.gistId}`}>
            <button className="p-1 border border-gray-700 rounded-lg flex gap-1 items-center bg-gray-800" >
              <CiEdit />
              Edit
            </button>
            </Link>
            <button className="p-1 border border-red-800 text-red-800 rounded-md flex gap-1 items-center" onClick={deleteHandler}>
              <RiDeleteBin6Line className="text-red-800" />
              Delete
            </button>
            {isOpen && (  // Check isOpen state outside the onClick handler
  <CollaboratorPopUp onClose={handleClose} isOpen={isOpen} gistId={gistId} />
)}

<button className="p-1 border border-gray-700 rounded-lg flex gap-1 items-center bg-gray-800 " onClick={handleOpen}>
  <CiEdit />
  Invite Collaborator
</button>

            
          </>
        )}
      </div>
    </div>
  );
}
