import { useContext } from "react";
import { AuthContext } from "../contexts/auth";
import { Navigate } from "react-router-dom";

export default function RequiresNotAuth(props) {
  const auth = useContext(AuthContext)
  if (auth.user) return <Navigate to="/:userId" />
  return <>{props.children}</>
}