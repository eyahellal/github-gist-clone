import { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore"; // Import `getDoc` and `doc`
import { auth, db } from "../firebase/firebase";
import { GistContext}from "./gistContext";

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
      // Sign in the user with email and password
      const loginResponse = await signInWithEmailAndPassword(auth, email, password);
      
      // Get the Firebase auth user
      const authUser = loginResponse.user;
      
      // Fetch additional user data from Firestore using the user ID
      const userDocRef = doc(db, "users", authUser.uid);
      const userDocSnapshot = await getDoc(userDocRef);
  
      if (userDocSnapshot.exists()) {
        const userData = userDocSnapshot.data();
        
        // Combine Firebase auth user object with Firestore user data
        const user = {
          uid: authUser.uid,
          email: authUser.email,
          displayName: authUser.displayName,
          ...userData, // Add Firestore data to the user object
        };
  
        // Update the user state with the combined user object
        setUser(user);
        
        console.log('User logged in with Firestore data:', user);
  
        return {
          success: true,
          errors: null,
          user,
        };
      } else {
        // Handle the case where no user data exists in Firestore
        console.log('No user data found in Firestore for this user.');
        
        // Just use the Firebase auth user if Firestore data is not found
        setUser(user);
  
        return {
          success: true,
          errors: null,
          user: authUser,
        };
      }
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

    // Set the displayName after registration
    
      // Update the user profile with the full name
      await updateProfile(authUser, {
        displayName: registerArgs.fullName,
      });

      // Store user details with `uid` as the document ID
      await setDoc(doc(db, "users", authUser.uid), {
        email: authUser.email,
        fullName: registerArgs.fullName,
        phoneNumber: registerArgs.phoneNumber,
      });

      
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
      await signOut(auth);
      setUser(null);
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
