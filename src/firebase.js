import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, addDoc, collection } from "firebase/firestore";
import { toast } from "react-toastify";
const firebaseConfig = {
  apiKey: "AIzaSyAtTy9suflDk_nuZauVzp5CD9HEan3KW3c",
  authDomain: "netflix-clone-9d7bc.firebaseapp.com",
  projectId: "netflix-clone-9d7bc",
  storageBucket: "netflix-clone-9d7bc.firebasestorage.app",
  messagingSenderId: "318061035442",
  appId: "1:318061035442:web:3c36de5c411071035d2eab"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signUp = async (name, email, password) => {
    try {
        const res=await createUserWithEmailAndPassword(auth, email, password);
        const user=res.user;
        await addDoc(collection(db, "user"), {
            uid: user.uid,
            name: name,
            email: email,
            authProvider:"local",
        })
    } catch (error) {
        console.log(error);
        toast.error("Sign up failed");
    }
}
const signIn = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
        toast.error("Sign in failed");
    }
}
const logOut = async () => {
    signOut(auth);
}
export {auth,db,signUp,signIn,logOut};