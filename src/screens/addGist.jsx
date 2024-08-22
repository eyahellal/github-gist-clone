import { useContext, useState } from "react";
import { GistContext } from "../contexts/gistContext";
import NavBar from "../components/navbar";
import { IoMdArrowDropdown } from "react-icons/io";
import NavDetails from "../components/nav-details";


export default function AddGist() {
  const gistContext = useContext(GistContext);
  const [value, setValue] = useState("");
  const [file, setFile] = useState("");

  const [description, setDescription] = useState("");

  const changeHandler = (event) => {
    setValue(event.target.value);
  };

  const descriptionHandler = (event) => {
    setDescription(event.target.value);
  };
  const FileHandler = (event) => {
    setDescription(event.target.value);
  };

  const ClickHandler = () => {
    gistContext.createGist(value, description,file);
    setValue("");
    setDescription("");
  };

  return (
    <>
    <NavBar>
      <NavDetails/>
    </NavBar>
    <div className="flex flex-col justify-center mt-40 shrink-0 gap-7 ">
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={descriptionHandler}
        className="bg-slate-900 mx-[20%] border border-slate-400/30 p-2" 
      />
        <input
        type="text"
        placeholder="file with extantion"
        value={file}
        onChange={FileHandler}
        className="bg-slate-900 mx-[20%] border border-slate-400/30 p-2" 
      />
      <input
        value={value}
        onChange={changeHandler}
        type="text"
        className="bg-transparent
         border  border-slate-400/30 mx-[20%] min-h-96 "
      />
      <div className="flex justify-center">
      <button onClick={ClickHandler} className="bg-green-700 w-fit p-1 border-r-0 rounded-lg flex items-center gap-2">
        <p>create a secret gist</p>
        <button><IoMdArrowDropdown className="bg-green-700 "/>
      </button>
      </button>
      
      </div>
    </div>
    </>
  );
}
