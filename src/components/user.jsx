import { Link } from "react-router-dom";
import UserImg from "../assets/utilisateur.png"; 

export default function User(props) {
  return (
    <div className="flex gap-3 items-start pt-2">
          <img src={UserImg} alt="user" className="h-8 w-8" />

      {/* User details */}
      <div className="flex flex-col">
        <div className="font-semibold text-blue-600">
          {props.username}/  
          <Link to={`/gistPage/${props.username}/${props.gistname}/${props.gistid}`}>
            {props.gistname}
          </Link>
        </div>
        <div className="text-slate-500">{props.creationDate}</div>
        <div className="text-slate-600">{props.description}</div>

        {props.isFork && (
          <div className="text-slate-600">
            Forked from: <span className="text-blue-600">{props.originalUser}</span>
          </div>
        )}
      </div>
    </div>
  );
}
