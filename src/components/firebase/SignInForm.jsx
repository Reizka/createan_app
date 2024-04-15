//import { signInWithEmailAndPassword } from "firebase/auth";
//import { auth } from "../../../firebaseConfig";
import { useState, useEffect } from "react"
const SignInForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        /*signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                console.log(`User ${user.email} signed in!`);
            })
            .catch((error) => {
                console.error(error);
                alert(error.message);
            });*/
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

export default SignInForm;