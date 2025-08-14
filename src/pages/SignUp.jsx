import React, { useState } from "react";
import logo from "../assets/Favicon.svg";
import google_icon from "../assets/Social media logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../config/firebase";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  // SIGN UP with Email/Password
  const signUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("Signed Up:", userCredential);
    } catch (err) {
      console.error("Sign Up Error:", err.message);
    }
    setEmail("");
    setPassword("");
    navigate("/login");
  };

  // GOOGLE SIGN UP / LOG IN
  const signWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log("Google Auth:", result.user);
    } catch (err) {
      console.error("Google Auth:", err.message);
    }
    navigate("/login");
  };

  return (
    <div className="w-[70vw] sm:w-[528px] lg:w-[60%] max-w-full ">
      <div className="text-center mb-[40px]">
        <img src={logo} alt="logo" className="mx-auto mb-4" />
        <h1 className="text-[#333333] text-[32px]">Sign Up</h1>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
      <div>
        <button
          onClick={signWithGoogle}
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
            onClick={signUp}
            className="bg-[#C4C4C4] border-0 rounded-[40px] h-[64px] text-[#FFFFFF] text-[22px] hover:bg-[#666666]"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
