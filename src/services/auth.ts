import { auth } from "@/lib/firebase";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";

export async function getUser() {
  await auth.authStateReady();
  return auth.currentUser;
}

export async function logout() {
  return auth.signOut();
}

export async function loginWithGoogle() {
  return signInWithPopup(auth, new GoogleAuthProvider());
}

export async function loginWithCredentials(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password);
}
