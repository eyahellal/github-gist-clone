import { useContext } from "react"
import { GistContext } from "../contexts/gistContext"
import Gist from "../components/gist";
import User from "../components/user";
import GistDetails from "../components/gist-details";

export default function AllGists(){
    const gistContext=useContext(GistContext);
    return(
        <div className="flex flex-col  min-h-screen mx-[15%]">
             {gistContext.gists.map((gist, index) => (
        <div className="grow w-full ">
        <div key={index} >
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
          <Gist
            key={gist.code}
            code={gist.code}
            
          />
        </div>
        </div>

      ))}
        </div>
    )
}