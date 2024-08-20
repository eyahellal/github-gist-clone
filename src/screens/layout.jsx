
// import { Outlet, useLoaderData } from "react-router-dom";
// import { collection, getDocs } from "firebase/firestore";
// import { db } from "../firebase/config";
// import Users from "../components/users";

import { useContext } from "react";
import { AuthContext } from "../contexts/auth";
import NavBar from "../components/navbar";
import Dashboard from "../components/dashboard";
import { Outlet } from "react-router-dom";


// export async function homeLoader() {
//   const users = [];
//   const querySnapshot = await getDocs(collection(db, "users"));
//   querySnapshot.forEach((doc) => {
//     users.push({ ...doc.data(), id: doc.id });
//   });

//   return { users };
// }

export default function Layout(props) {
//   const { users } = useLoaderData();

//   return (
//     <div className="flex flex-col items-center justify-center w-screen h-screen">
//       <div className="border border-black rounded-sm w-3/5 grid grid-cols-4">
//         <div className="col-span-1 border-r border-r-black h-full p-5">
//           <Users users={users} />
//         </div>
//         <div className="col-span-3 h-full p-5">
//           <Outlet />
//         </div>
//       </div>
//     </div>
//   );
const  auth=useContext(AuthContext)
const clickHandler=()=>{
auth.logout()
}
return(

  <div>
    {props.children}
    <Dashboard/>
    <Outlet />

  
      
      
  </div>
)
}
