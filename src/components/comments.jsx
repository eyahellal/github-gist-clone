import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import UserImg from "../assets/utilisateur.png";
import CommentSection from "./comment-section";
import { db } from "../firebase/firebase"; // Import Firestore configuration
import { doc, getDoc } from "firebase/firestore"; // Firestore methods

export default function Comment() {
  const { gistid } = useParams(); // Get the Gist ID from the route params
  const [comments, setComments] = useState([]); // Initialize comments state

  // Fetch comments for the specific Gist from Firestore
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const gistRef = doc(db, "gists", gistid); // Reference to the specific Gist document
        const gistSnap = await getDoc(gistRef); // Fetch the Gist document

        if (gistSnap.exists()) {
          const gistData = gistSnap.data();
          const fetchedComments = gistData.comments || []; // Get the comments array or default to an empty array
          setComments(fetchedComments); // Update the state with the fetched comments
        } else {
          console.error("No such Gist found!");
        }
      } catch (error) {
        console.error("Error fetching comments: ", error);
      }
    };

    if (gistid) {
      fetchComments(); // Call the fetch function when the gistid is available
    }
  }, [gistid]); // Dependency on gistid to fetch comments whenever the ID changes

  return (
    <div className="max-w-4/5 w-full">
      {comments.map((comment, index) => (
        <div className="flex gap-2 shrink-0 mb-4" key={index}>
          <img src={UserImg} alt="user" className="h-6 w-6" />
          <div className="flex flex-col border !border-gray-400/40 rounded whitespace-pre-wrap border-opacity-30 w-full">
            <div className="bg-custom-blue p-2 text-blue-700 font-semibold flex gap-2 items-center">
              {comment.user}
            </div>
            <p className="p-2">{comment.content}</p>
          </div>
        </div>
      ))}
      {/* Pass setComments to CommentSection to add new comments */}
      <CommentSection setComments={setComments} comments={comments} />
    </div>
  );
}
