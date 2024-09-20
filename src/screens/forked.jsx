import User from "../components/user";
import GistDetails from "../components/gist-details";
import Gist from "../components/gist";
import { useOutletContext } from "react-router-dom";

export default function Forked() {
  const { gists } = useOutletContext(); 
  return (
    <div className="flex flex-col min-h-screen mx-[15%]">
      {gists
        .filter((gist) => gist.forks > 0)
        .map((gist) => (
          <div key={gist.id} className="grow w-full">
            <div className="flex justify-between">
              <User
                gistname={gist.gistName}
                username={gist.username}
                creationDate={gist.creationDate}
                description={gist.description}
              />
              <GistDetails
                stars={gist.stars}
                forks={gist.forks}
                files={gist.files}
                comments={gist.comments}
                />
            </div>
            <Gist code={gist.code} />
          </div>
        ))}
    </div>
  );
}
