import { useState } from "react";
import GistDetail from "./gist-detail";
import { FaStar, FaCodeBranch, FaFile, FaCode } from "react-icons/fa";
import { GoCodeSquare } from "react-icons/go";
import { IoIosGitNetwork } from "react-icons/io";
import { FaRegCommentAlt } from "react-icons/fa";
import { CiStar } from "react-icons/ci";






export default function GistDetails(props) {
  const [stars, setStars] = useState(props.stars);
  const [forks, setForks] = useState(props.forks);
  const [comments, setComments] = useState(props.comments);


  return (
    <div className="flex gap-4">
      <GistDetail count={props.files} title="files" icon={< GoCodeSquare/>} />
      <GistDetail count={props.forks} title="forks" icon={<IoIosGitNetwork  />} />
      <GistDetail count={props.comments} title="comments" icon={<FaRegCommentAlt/>} />
      <GistDetail count={props.stars} title="stars" icon={<CiStar  />} />

    </div>
  );
}
