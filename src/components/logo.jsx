import { DiGithubFull } from "react-icons/di";

export default function Logo(){
    return(
        <div className="flex items-center">
        <DiGithubFull className="w-20 h-20"/>
        <p className="text-2xl">Gist</p>
        </div>
    )
}