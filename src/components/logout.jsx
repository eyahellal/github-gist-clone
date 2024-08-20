import { useContext } from "react";
import { Button } from "./button";
import { AuthContext } from "../contexts/auth";

export default function Logout() {
  const auth = useContext(AuthContext);
  
  const handleLogut = async () => {
    await auth.logout();
  };

  return (
    <Button type="button" onClick={handleLogut}>
      logout
    </Button>
  );
}
