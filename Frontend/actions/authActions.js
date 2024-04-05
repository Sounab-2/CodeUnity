import { setLoading, setUser, logout } from '../features/userSlice';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import app from "./firebase";
import { navigate } from 'react-router-dom';

export const signUp = (email, password) => async (dispatch) => {
  dispatch(setLoading(true));
  const auth = getAuth(app);
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log(userCredential);
    // const user = userCredential.user;
    // dispatch(setUser(user));
    // navigate('/signin');
  } catch (error) {
    console.error(error);
  } finally {
    dispatch(setLoading(false)); 
  }
};
