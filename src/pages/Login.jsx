import React, { useState } from "react";
import logo from "../assets/Favicon.svg";
import google_icon from "../assets/Social media logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { db, auth, googleProvider } from "../config/firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const logIn = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;
      console.log("Logged In:", user);

      const docRef = doc(db, "profile", user.uid);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        navigate("/profile"); // User has details
      } else {
        navigate("/detail"); // User needs to fill details
      }
    } catch (err) {
      console.error("Log In Error:", err.message);
    }
    setEmail("");
    setPassword("");
  };

  // GOOGLE SIGN UP / LOG IN
  const loginGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      console.log("Google Auth:", user);

      const docRef = doc(db, "profile", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        navigate("/profile"); // User has details
      } else {
        navigate("/detail"); // User needs to fill details
      }
    } catch (err) {
      console.error("Google Auth Error:", err.message);
    }
  };

  return (
    <div className="w-[70vw] sm:w-[528px] lg:w-[60%] max-w-full ">
      <div className="text-center mb-[40px]">
        <img src={logo} alt="logo" className="mx-auto mb-4" />
        <h1 className="text-[#333333] text-[32px]"> Log In</h1>
        <p>
          Don't have an account? <Link to="/">SignUp</Link>
        </p>
      </div>
      <div>
        <button
          onClick={loginGoogle}
          className="flex items-center justify-center w-full h-[72px] rounded-[40px] border-[#333333] border-[1px]"
        >
          <img src={google_icon} />
          Continue with Google
        </button>

        {/* Divider */}
        <div className="flex items-center my-[40px]">
          <hr className="flex-1 border-gray-300" />
          <span className="px-2 text-gray-500 text-sm">OR</span>
          <hr className="flex-1 border-gray-300" />
        </div>
        <div className="flex flex-col ">
          <label className="text-[#666666] text-[16px]">Your Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="Email"
            className="border-[#666666]  border-[1px] rounded-[12px] h-[56px] mb-[24px] px-4 py-2"
            placeholder="Enter your Email...."
          />
          <label className="text-[#666666] text-[16px]">Your password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type=""
            className="border-[#666666]  border-[1px] rounded-[12px] h-[56px] mb-[30px] px-4 py-2"
            placeholder="Enter your Password...."
          />
        </div>
        <div className="flex flex-col">
          <button
            onClick={logIn}
            className="bg-[#C4C4C4] border-0 rounded-[40px] h-[64px] text-[#FFFFFF] text-[22px] hover:bg-[#666666]"
          >
            Log In
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
