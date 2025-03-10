
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "./firebase";

// Sign Up Function
export const signUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log(userCredential.user)
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

// Sign In Function
export const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log(userCredential.user)
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

// Logout Function
export const logout = async () => {
  await signOut(auth);
};
