import { useContext, useState } from "react";
import { GistContext } from "../contexts/gistContext";

export default function AddGist() {
  const gistContext = useContext(GistContext);
  const [value, setValue] = useState("");
  const [description, setDescription] = useState("");

  const changeHandler = (event) => {
    setValue(event.target.value);
  };

  const descriptionHandler = (event) => {
    setDescription(event.target.value);
  };

  const ClickHandler = () => {
    gistContext.createGist(value, description,0,0,0,0);
    setValue("");
    setDescription("");
  };

  return (
    <>
    <div className="flex flex-col justify-center mt-40 shrink-0 gap-7 ">
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={descriptionHandler}
        className="bg-slate-900 mx-[20%] border border-slate-400/30 p-2" 
      />
      <input
        value={value}
        onChange={changeHandler}
        type="text"
        className="bg-transparent
         border p-2 border-slate-400/30 mx-[20%] min-h-60 "
      />
      <button onClick={ClickHandler} className="bg-green-700 w-fit p-1 rounded-lg self-center">Create secret gist</button>
    </div>
    </>
  );
}
