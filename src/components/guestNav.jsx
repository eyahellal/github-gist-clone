import { Link } from "react-router-dom";

export default function GuestNav(){
    return(
        <div className="flex gap-3">
            <Link to="/login">
          <button className="font-semibold  p-1 ">sign in</button>
        </Link>
        <Link to="/register">
          <button className="font-semibold border border-slate-300 p-1  rounded-md">sign up</button>
        </Link>

        </div>
    )
}