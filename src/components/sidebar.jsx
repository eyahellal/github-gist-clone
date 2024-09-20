import  UserImg from "../assets/utilisateur.png"
import { BsPeople } from "react-icons/bs";


export default function SideBar(props){
    return(
        <div className="flex flex-col items-start p-4 ml-16 gap-2 shrink-0">
        <img src={UserImg} alt="user" className="h-56 w-56" />
        <p className="font-semibold text-2xl"> {props.email}</p>
        <p className="text-xl text-slate-400">{props.username}</p>
       
        <div className="flex gap-3 items-center">
        <BsPeople />

        <div>
            <span className="font-semibold">{props.following} </span> <span className="text-slate-400">following</span>
        </div>
        <div>
        <span className="font-semibold">{props.followers}</span>   <span className="text-slate-400">followers</span>
        </div>
        </div>




        </div>
    )

}