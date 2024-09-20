import React, { useEffect, useRef } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import { GoCodeSquare } from "react-icons/go";
import hljs from "highlight.js";
import "highlight.js/styles/github.css"; // Import your preferred theme
import Comments from "../components/comments";
import { doc, getDoc } from "firebase/firestore"; // Import Firestore methods
import { db } from "../firebase/firebase"; // Import your Firebase config


export async function loadGist({ params }) {
  const gistId = params.gistId;

  // Try to fetch from the "gists" collection first
  const gistRef = doc(db, "gists", gistId);
  const gistSnap = await getDoc(gistRef);

  let gist;
  if (gistSnap.exists()) {
    gist = {
      gistId: gistSnap.id,
      ...gistSnap.data(),
    };
  } else {
    // If not found in "gists", check in the "forks" collection
    const forkRef = doc(db, "forks", gistId);
    const forkSnap = await getDoc(forkRef);

    if (forkSnap.exists()) {
      gist = {
        gistId: forkSnap.id,
        ...forkSnap.data(),
        isFork: true, // Add a flag to indicate it's a fork
      };
    } else {
      gist = null; // If no gist found
    }
  }

  let user = null;
  if (gist !== null) {
    const userRef = doc(db, "users", gist.userid); // Correct variable name
    const userDocSnapshot = await getDoc(userRef);
    user = userDocSnapshot.exists()
      ? { userId: userDocSnapshot.id, ...userDocSnapshot.data() }
      : null;
  }

  return {
    gist,
    user,
  };
}

export default function Code() {
  const { gist, user } = useLoaderData();
  const codeRef = useRef(null);

  useEffect(() => {
    if (codeRef.current && gist?.code) {
      hljs.highlightElement(codeRef.current);
    }
  }, [gist?.code]);

  return (

    <div className="flex flex-col gap-5 pl-80 justify-center w-4/5">
      <div className="flex flex-col border !border-gray-400/40 rounded whitespace-pre-wrap border-opacity-30 grow">
        <div className="bg-custom-blue p-2 text-blue-700 font-semibold flex gap-2 items-center">
          <GoCodeSquare className="text-white" />
          <p>{gist?.gistName} {gist?.isFork ? "(Forked)" : ""}</p> {/* Show if it's forked */}
        </div>
        <pre>
          <code
            ref={codeRef}
            style={{ background: "transparent" }}
            className="language-javascript text-white whitespace-pre-wrap"
          >
            {gist?.code}
          </code>
        </pre>
      </div>

      <Comments gistId={gist?.gistId} />
    </div>
  );
}
