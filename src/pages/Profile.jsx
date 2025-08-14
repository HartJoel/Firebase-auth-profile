import React, { useEffect, useState } from "react";
import logo from "../assets/Favicon.svg";
import { Link } from "react-router-dom";
import { auth, db } from "../config/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

const Profile = () => {
  const [profile, setProfile] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async (user) => {
      try {
        const profileRef = doc(db, "profile", user.uid);
        const profileSnap = await getDoc(profileRef);
        if (profileSnap.exists()) {
          setProfile(profileSnap.data());
        } else {
          navigate("/details");
        }
      } catch (err) {
        console.error("Error fetching user details:", err);
        setError("Failed to load profile. Please try again later.");
      }

      setLoading(false);
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchProfile(user);
      } else {
        navigate("/login");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  const updateProfile = () => {
    navigate("/detail");
  };

  // ✅ Show loader while fetching
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader color="#36d7b7" loading={true} size={50} />
      </div>
    );
  }

  if (!profile) {
    return <p>No profile found.</p>;
  }

  if (error) return <p className="text-red-500">{error}</p>; // Display error

  return (
    <div className="w-[70vw] sm:w-[528px] lg:w-[60%] max-w-full ">
      <div className="flex justify-end">
        <button
          onClick={handleLogout}
          className="bg-[#C4C4C4] border-0 rounded-[40px] h-[64px] w-[120px] text-[#FFFFFF] text-[22px] hover:bg-[#666666]"
        >
          Log Out
        </button>
      </div>

      <div className="text-center mb-[40px]">
        <img src={logo} alt="logo" className="mx-auto mb-4" />
        <h1 className="text-[#333333] text-[32px]">My Profile</h1>
      </div>
      <div>
        <div className="flex flex-col ">
          <div className="mb-[24px]">
            <p className="text-[#666666] text-[16px]">First Name:</p>
            <h1 className="text-[50px]">{profile.firstName}</h1>
          </div>
          <div className="mb-[24px]">
            <p className="text-[#666666] text-[16px]">Last Name:</p>
            <h1 className="text-[50px]">{profile.lastName}</h1>
          </div>
          <div className="mb-[24px]">
            <p className="text-[#666666] text-[16px]">My Age:</p>
            <h1 className="text-[50px]">{profile.age}</h1>
          </div>
          <div className="mb-[24px]">
            <p className="text-[#666666] text-[16px]">My Favourite Movie:</p>
            <h1 className="text-[50px]">{profile.favouriteMovie}</h1>
          </div>
        </div>
        <div className="flex justify-start">
          <button
            onClick={updateProfile}
            className="bg-[#C4C4C4] border-0 rounded-[40px] h-[64px] w-[120px] text-[#FFFFFF] text-[22px] hover:bg-[#666666]"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
