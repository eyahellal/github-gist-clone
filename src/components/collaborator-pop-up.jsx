import React, { useState } from "react";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../firebase/firebase"; // Adjust the import based on your project structure
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";

async function getUserByEmail(email) {
  const db = getFirestore(); // Replace with your Firebase instance if needed

  const q = query(collection(db, "users"), where("email", "==", email)); // Query users by email
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    return null; // No user found
  }

  const userDoc = querySnapshot.docs[0]; // Get the first document (assuming unique emails)
  return userDoc.data(); // Return the user object
}
export default function AddCollaborator(props) {
    const [email,setEmail]=useState("")
    // if (props.onClose) return null; // Prevent rendering if not open


  
    const handleAddCollaborator = async () => {
        const userRef = await getUserByEmail(email);
        console.log("User Reference:", userRef);

        if (userRef && userRef.id) { // Ensure userRef and userRef.id are defined
          const gistRef = doc(db, "gists", props.gistId);

      
          try {
            await updateDoc(gistRef, {
              collaborators: arrayUnion(userRef.id),
            });
            console.log("Collaborator added successfully!");
            props.onClose(); // Close the modal
          } catch (error) {
            console.error("Error adding collaborator: ", error);
          }
        } else {
          console.error("User not found or invalid user ID.");
        }
      };
      


 

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-black rounded-lg p-6 w-1/3">
        <h2 className="text-lg font-semibold mb-4">Invite Collaborator</h2>
        <input
          type="email"
          className="border p-2 w-full rounded-md mb-4 bg-custom-blue"
          placeholder="Collaborator's email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="flex justify-end gap-3">
          <button
            className="px-4 py-2 bg-red-700 text-white rounded-md"
            onClick={props.onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-green-600 text-white rounded-md"
            onClick={handleAddCollaborator}
          >
            Add Collaborator
          </button>
        </div>
      </div>
    </div>
  );
}
