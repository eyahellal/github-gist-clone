import { useEffect } from "react";
import { useNavigate, useParams, Outlet } from "react-router-dom";
import NavDetails from "../components/nav-details";
import NavBar from "../components/navbar";
import UserImg from "../assets/utilisateur.png";
import GistDashboard from "../components/gistDashboard";

export default function GistPage() {
  const { userName, gistName, gistId } = useParams();
  const navigate = useNavigate(); 

  

  useEffect(() => {
    if (gistId) {
      navigate(`/gistPage/${userName}/${gistName}/${gistId}/code`); // Replace 'code' with the appropriate route if different
    }
  }, [gistId, navigate]);

  return (
    <div>
      <NavBar>
        <NavDetails />
      </NavBar>
      <div className="flex flex-col gap-3 pt-2 ml-10  p-16">
        <img src={UserImg} alt="user" className="h-12 w-12" />
        <div className="flex flex-col grow ">
          <div className="font-semibold text-blue-600 text-lg">
            {userName}/{gistName}
          </div>
          <div className="text-slate-500">Report abuse</div>
          <GistDashboard gistid={gistId} />
         
        </div>
       
      </div>
      <Outlet />
    </div>
  );
}
