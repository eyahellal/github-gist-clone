import React, { useState, useEffect } from "react";
import Gist from "../components/gist";
import User from "../components/user";
import GistDetails from "../components/gist-details";
import { useOutletContext } from "react-router-dom";

export default function AllGists() {
  const { gists } = useOutletContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, [gists]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    
    <div className="  md:flex flex-col min-h-screen mx-[15%]  ">
      {gists.map((gist) => (
        <div key={gist.id} className=" md:grow w-full mb-4 ">
          <div className="md:flex justify-between sm:flex-col flex-wrap ">
            <User
              gistid={gist.id}
              key={gist.id}
              gistname={gist.gistName}
              username={gist.username}
              creationDate={gist.creationDate}
              description={
                gist.isFork ? `Forked from ${gist.originalUser}` : gist.description
              } 
            />
            <GistDetails
              gistid={gist.id}
              stars={gist.stars}
              forks={gist.forks}
              files={gist.files}
              comments={gist.comments.length}
            />
          </div>
          <Gist code={gist.code} />
        </div>
      ))}
    </div>
  );
}
