
import  UserImg from "../assets/utilisateur.png"
export default function User (props){
    return(
        <div className="flex gap-3 items-start pt-2">
            
        <img src={UserImg} alt="user" className="h-6 w-6" />
        <div className="flex flex-col ">
            <div className="font-semibold text-blue-600">{props.username}/{props.gistname}</div>
            <div className="text-slate-500">{props.creationDate}</div>
            <div className="text-slate-600">{props.description}</div>


            

        </div>
        </div>

    )
} 