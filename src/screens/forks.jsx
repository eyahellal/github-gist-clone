import { useParams } from "react-router-dom";

export default function Forks(){
    const {forks} = useParams();

    return(
        
          
        <div className="ml-32">
            <h2 className="text-lg">Forks</h2>
            <div className="flex gap-2 items-center">
                <p>All</p>
            <p className="px-3 py-2 rounded-full bg-custom-blue">{forks}</p>
            </div>

        </div>
    )
}