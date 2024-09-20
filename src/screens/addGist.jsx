import { useContext, useState, useEffect } from "react";
import NavBar from "../components/navbar";
import NavDetails from "../components/nav-details";
import { AuthContext } from "../contexts/auth";
import { db } from "../firebase/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import Dropdown from "../components/dropdown"; // Import the new Tailwind dropdown component

const createGist = async (value, description, file, username, auth, isPublic) => {
  if (!auth?.user?.uid) {
    console.error("User is not authenticated. Cannot create gist.");
    return;
  }

  const newGist = {
    code: value,
    description: description,
    stars: 0,
    forks: 0,
    files: 1,
    comments: [],
    collaborators: [],
    gistName: file,
    username: username,
    userid: auth.user.uid,
    public: isPublic, 
    creationDate: new Date().toLocaleDateString(),
  };

  try {
    const gistRef = await addDoc(collection(db, "gists"), newGist);
    console.log("Gist added with ID: ", gistRef.id);
    return gistRef.id;
  } catch (error) {
    console.error("Error adding gist: ", error);
  }
};

export default function AddGist() {
  const auth = useContext(AuthContext);
  const [value, setValue] = useState("");
  const [file, setFile] = useState("");
  const [description, setDescription] = useState("");
  const [myGists, setMyGists] = useState([]);
  const [gists, setGists] = useState([]);

  const changeHandler = (event) => setValue(event.target.value);
  const descriptionHandler = (event) => setDescription(event.target.value);
  const fileHandler = (event) => setFile(event.target.value);

  const SecretGistHandler = async () => {
    await createGist(value, description, file, auth.user.displayName, auth, false);
    setValue("");
    setDescription("");
    setFile("");
    fetchGists();
  };

  const PublicGistHandler = async () => {
    await createGist(value, description, file, auth.user.displayName, auth, true);
    setValue("");
    setDescription("");
    setFile("");
    fetchGists();
  };

  const fetchGists = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "gists"));
      const fetchedGists = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setGists(fetchedGists);
      setMyGists(fetchedGists.filter((gist) => gist.userid === auth?.user?.uid));
    } catch (error) {
      console.error("Error fetching gists: ", error);
    }
  };

  useEffect(() => {
    fetchGists();
  }, [auth?.user?.uid]);

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
            onSecretGistClick={SecretGistHandler}
            onPublicGistClick={PublicGistHandler}
          />
        </div>
      </div>
    </>
  );
}
