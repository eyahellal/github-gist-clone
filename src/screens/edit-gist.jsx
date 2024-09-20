import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../components/navbar";
import NavDetails from "../components/nav-details";
import { AuthContext } from "../contexts/auth";
import { db } from "../firebase/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import Dropdown from "../components/dropdown";

const updateGist = async (gistId, updatedGist) => {
  try {
    const gistRef = doc(db, "gists", gistId);
    await updateDoc(gistRef, updatedGist);
    console.log("Gist updated with ID: ", gistId);
  } catch (error) {
    console.error("Error updating gist: ", error);
  }
};

export default function EditGist() {
  const { gistId } = useParams(); // Get gistId from URL
  const auth = useContext(AuthContext);
  const [value, setValue] = useState("");
  const [file, setFile] = useState("");
  const [description, setDescription] = useState("");
  const [isPublic, setIsPublic] = useState(true); // For public/secret toggle

  const changeHandler = (event) => setValue(event.target.value);
  const descriptionHandler = (event) => setDescription(event.target.value);
  const fileHandler = (event) => setFile(event.target.value);

  const fetchGist = async () => {
    try {
      const gistRef = doc(db, "gists", gistId);
      const gistSnap = await getDoc(gistRef);

      if (gistSnap.exists()) {
        const gistData = gistSnap.data();
        setValue(gistData.code);
        setFile(gistData.gistName);
        setDescription(gistData.description);
        setIsPublic(gistData.public);
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error fetching gist: ", error);
    }
  };

  useEffect(() => {
    if (gistId) {
      fetchGist();
    }
  }, [gistId]);

  const handleUpdate = async (newPublicStatus) => {
    const updatedGist = {
      code: value,
      description: description,
      gistName: file,
      public: newPublicStatus,
    };

    await updateGist(gistId, updatedGist);

    // Reset fields
    setValue("");
    setDescription("");
    setFile("");
    setIsPublic(true); // Reset to default (true) or any other default value
  };

  return (
    <>
      <NavBar>
        <NavDetails />
      </NavBar>
      <div className="flex flex-col justify-center mt-40 shrink-0 gap-7">
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={descriptionHandler}
          className="bg-slate-900 mx-[20%] border border-slate-400/30 p-2"
        />
        <input
          type="text"
          placeholder="File with extension"
          value={file}
          onChange={fileHandler}
          className="bg-slate-900 mx-[20%] border border-slate-400/30 p-2"
        />
        <textarea
          value={value}
          onChange={changeHandler}
          placeholder="Write your code here"
          className="bg-transparent border border-slate-400/30 mx-[20%] min-h-96 p-2"
        />
        <div className="flex justify-center">
          <Dropdown
            onPublicGistClick={() => handleUpdate(true)}
            onSecretGistClick={() => handleUpdate(false)}
          />
        </div>
      </div>
    </>
  );
}
