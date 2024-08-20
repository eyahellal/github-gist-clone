import { Link } from "react-router-dom";
import Logo from "./logo";

export default function NavBar(props) {
  return (
    <div className="flex  items-center justify-between px-3 bg-custom-blue">
      <div className="flex items-center gap-3">
        <Logo />
        <input
          type="text"
          placeholder="search..."
          className="border bg-transparent h-min  rounded-md"
        />
        <Link to="/allGists" className="font-semibold">
          All Gists
        </Link>
        <Link className="font-semibold">Back to Github</Link>
      </div>
      <div className="flex gap-5 items-center py-0">
        {props.children}
      
      </div>
    </div>
  );
}
