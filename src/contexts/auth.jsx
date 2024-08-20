import { createContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";

export const AuthContext = createContext({
  user: null,
  login: (email, password) => {},
  register: (registerArgs) => {},
  logout: () => {},
});

export default function AuthProvider(props) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, []);

  const login = async (email, password) => {
    try {
      const loginResponse = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = loginResponse.user;
      setUser(user);

      return {
        success: true,
        errors: null,
        user,
      };
    } catch (error) {
      return {
        success: false,
        errors: {
          code: error.code,
          message: error.message,
        },
        user: null,
      };
    }
  };

  const register = async (registerArgs) => {
    try {
      const registerResponse = await createUserWithEmailAndPassword(
        auth,
        registerArgs.email,
        registerArgs.password
      );

      const authUser = registerResponse.user;

      await addDoc(collection(db, "users"), {
        email: authUser.email,
        fullName: registerArgs.fullName,
        phoneNumber: registerArgs.phoneNumber,
      });

      setUser(authUser);

      return {
        success: true,
        errors: null,
        user: authUser,
      };
    } catch (error) {
      return {
        success: false,
        errors: {
          code: error.code,
          message: error.message,
        },
        user: null,
      };
    }
  };

  const logout = async () => {
    try {
      await signOut();
    } catch (error) {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
