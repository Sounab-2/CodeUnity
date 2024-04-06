import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";

const FirebaseContext = createContext();

export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = (props) => {
  
  const [user, setUser] = useState(null);

  useEffect(() => {
   onAuthStateChanged(auth,(user) => {
      if(user){
        setUser(user)
      }else{
        setUser(null)
      }
    });

    
  }, []);

  const signupUserwithEmailAndPassword = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInUserWithEmailAndPassword =(email,password) =>{
    return signInWithEmailAndPassword(auth,email,password);
  };

  const signInUserWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  const signoutUser = () =>{
    return signOut(auth);
  };

  return (
    <FirebaseContext.Provider value={{ 
      user,
      signupUserwithEmailAndPassword,
      signInUserWithEmailAndPassword,
      signInUserWithGoogle,
      signoutUser
    }}>
      {props.children}
    </FirebaseContext.Provider>
  );
};
