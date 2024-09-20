import User from "../components/user";
import GistDetails from "../components/gist-details";
import Gist from "../components/gist";
import { auth, db } from "../firebase/firebase";
import { getDocs, where, collection, query } from "firebase/firestore";
import { useLoaderData, useOutletContext } from "react-router-dom";




export async function loadMyGists() {
  const user = auth.currentUser;

  if (!user?.uid) return { gists: [] }; 

  const gistsCollection = collection(db, "gists");
  const q = query(gistsCollection, where("userid", "==", user.uid));
  const querySnapshot = await getDocs(q);

  const gists = [];
  querySnapshot.forEach((doc) => {
    gists.push({
      gistId: doc.id,
      ...doc.data(),
    });
  });

  return { gists };
}

export default function AllMyGists() {
  const { user } = useOutletContext();
  const { gists } = useLoaderData();

  return (
    <div className="flex flex-col min-h-screen w-3/5 items-start">
      {gists.map((gist) => (
        <div className="grow w-full" key={gist.gistId}>
          <div className="flex justify-between">
            <User
              gistid={gist.gistId}
              gistname={gist.gistName}
              username={user?.displayName}
              creationDate={gist.creationDate}
            />
            <GistDetails
              stars={gist.stars}
              forks={gist.forks}
              files={gist.files}
              comments={gist.comments}
            />
          </div>
          <Gist key={gist.gistId} code={gist.code} />
        </div>
      ))}
    </div>
  );
}


 