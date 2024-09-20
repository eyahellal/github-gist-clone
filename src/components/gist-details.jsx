import { useState } from "react";
import GistDetail from "./gist-detail";
import { FaRegCommentAlt } from "react-icons/fa";
import { GoCodeSquare } from "react-icons/go";
import { IoIosGitNetwork } from "react-icons/io";
import { CiStar } from "react-icons/ci";
import { doc, updateDoc, increment } from "firebase/firestore";
import { db } from "../firebase/firebase"; // Import Firebase config

export default function GistDetails(props) {
  const handleStarClick = async () => {
    try {
      const gistRef = doc(db, "gists", props.gistid); 
      await updateDoc(gistRef, {
        stars: increment(1) 
      });
      console.log("Star added!");
    } catch (error) {
      console.error("Error adding star: ", error);
    }
  };

  return (
    <div className="flex gap-4">
      <GistDetail count={props.files} title="files" icon={<GoCodeSquare />} />
      <GistDetail
        count={props.forks}
        title="forks"
        icon={<IoIosGitNetwork />}
      />
      <GistDetail
        count={props.comments.length}
        title="comments"
        icon={<FaRegCommentAlt />}
      />
     <button  onClick={handleStarClick} ><GistDetail
        count={props.stars}
        title="stars"
        icon={<CiStar />}
       
      /></button> 
    </div>
  );
}
