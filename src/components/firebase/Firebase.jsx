//React imports
import { createContext, useContext, useState, useEffect } from "react"
//Firebase imports

import { getAuth, signOut, signInWithEmailAndPassword } from "firebase/auth";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
//import { auth } from "../../../firebaseConfig";
import { app } from "../../../firebaseConfig"


const auth = getAuth(app); // Get authentication instance
// Create an Authentication Context
const AuthContext = createContext();
// Custom hook to access the Authentication Context
const useAuth = () => useContext(AuthContext);

// Authentication Provider Component
const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);



    const signIn = async (email, password) => {
        await signInWithEmailAndPassword(email, password);
    };

    const signOut = async () => {
        await signOut();
    };


}

const SignInForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user);
                console.log(getAuth());
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">Sign In</button>
        </form>
    );
};


export { AuthProvider, SignInForm };