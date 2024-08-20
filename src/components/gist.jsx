import { useContext } from "react"
import { GistContext } from "../contexts/gistContext"

export default function Gist(props){
    const gistContext=useContext(GistContext);
    return(

        <div className="border border-gray-400 p-2  rounded whitespace-pre-wrap border-opacity-30">
            
            <pre>
                    {props.code}
            
            </pre>
        </div>
    )
}