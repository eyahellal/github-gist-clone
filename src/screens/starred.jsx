import { useContext } from "react";
import { GistContext } from "../contexts/gistContext";
import User from "../components/user";
import GistDetails from "../components/gist-details";
import Gist from "../components/gist";

export default function Starred() {
  const gistContext = useContext(GistContext);

  return (
    <div className="flex flex-col min-h-screen mx-[15%]">
      {gistContext.gists
        .filter((gist) => gist.stars > 0)
        .map((gist, index) => (
          <div key={index} className="grow w-full">
            <div className="flex justify-between">
              <User
                key={gistContext.users[index].userId}
                gistname={gistContext.users[index].gistName}
                username={gistContext.users[index].username}
                creationDate={gistContext.users[index].creationDate}
                description={gistContext.users[index].description}
              />
              <GistDetails
                stars={gist.stars}
                forks={gist.forks}
                files={gist.files}
                comments={gist.comments}
              />
            </div>
            <Gist key={gist.code} code={gist.code} />
          </div>
        ))}
    </div>
  );
}
