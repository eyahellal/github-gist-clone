import { useContext, useState } from "react";
import { db } from "../firebase/firebase"; // Import Firestore configuration
import { doc, updateDoc, arrayUnion } from "firebase/firestore"; // Firestore methods
import { useParams } from "react-router-dom"; // To get Gist ID
import { AuthContext } from "../contexts/auth";

export default function CommentSection({ setComments, comments }) {
  const { user } = useContext(AuthContext);
  const { gistId } = useParams(); // Get the Gist ID from the route params
  const [newComment, setNewComment] = useState("");

  const handleAddComment = async () => {
    if (!gistId || !newComment.trim()) {
      console.error("Gist ID or comment is missing.");
    
    }

    const newCommentObj = {
      user: user.displayName,
      content: newComment,
      
    };

    try {
      const gistRef = doc(db, "gists", gistId); // Reference to the specific Gist document

      // Use arrayUnion to add the new comment to the comments array
      await updateDoc(gistRef, {
        comments: arrayUnion(newCommentObj),
      });

      // Update the local state to reflect the newly added comment
      setComments([...comments, newCommentObj]);

      // Clear the input field
      setNewComment("");
    } catch (error) {
      console.error("Error adding comment: ", error);
    }
  };

  return (
    <div className="mt-4">
      <input
        placeholder="Add new comment"
        value={newComment}
        onChange={(event) => setNewComment(event.target.value)}
        className="bg-slate-900 border border-slate-400/30 p-2 mt-2 w-full"
      />
      <button
        onClick={handleAddComment}
        className="bg-green-700 text-white p-2 mt-2 rounded-lg"
      >
        Add Comment
      </button>
    </div>
  );
}
