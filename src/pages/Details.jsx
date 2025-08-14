import React, { useState } from "react";
import logo from "../assets/Favicon.svg";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../config/firebase";
import { doc, setDoc } from "firebase/firestore";

const Details = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState(0);
  const [favouriteMovie, setFavouriteMovie] = useState("");

  const navigate = useNavigate();

  const detailsDocRef = doc(db, "profile", auth.currentUser.uid);

  const submitDetails = async () => {
    if (!auth?.currentUser) {
      alert("You must be logged in to submit details!");
      return;
    }

    // ✅ Validate fields
    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !age ||
      !favouriteMovie.trim()
    ) {
      alert("Please fill in all fields before proceeding.");
      return;
    }
    try {
      await setDoc(detailsDocRef, {
        firstName: firstName,
        lastName: lastName,
        age: age,
        favouriteMovie: favouriteMovie,
        userId: auth?.currentUser?.uid,
      });
    } catch (err) {
      console.error(err);
    }
    setFirstName("");
    setLastName("");
    setAge(0);
    setFavouriteMovie("");
    navigate("/profile");
  };

  return (
    <div className="w-[70vw] sm:w-[528px] lg:w-[60%] max-w-full ">
      <div className="text-center mb-[40px]">
        <img src={logo} alt="logo" className="mx-auto mb-4" />
        <h1 className="text-[#333333] text-[32px]">Input Details</h1>
      </div>
      <div>
        <div className="flex flex-col ">
          <label className="text-[#666666] text-[16px]">
            Input Your First Name
          </label>
          <input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            type="text"
            className="border-[#666666]  border-[1px] rounded-[12px] h-[56px] mb-[24px] px-4 py-2"
            placeholder="Enter your First Name...."
          />
          <label className="text-[#666666] text-[16px]">
            Input Your Last Name
          </label>
          <input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            type="text"
            className="border-[#666666]  border-[1px] rounded-[12px] h-[56px] mb-[24px] px-4 py-2"
            placeholder="Enter your Last Name...."
          />
          <label className="text-[#666666] text-[16px]">Input Your Age</label>
          <input
            value={age}
            onChange={(e) => setAge(e.target.value)}
            type="number"
            className="border-[#666666]  border-[1px] rounded-[12px] h-[56px] mb-[24px] px-4 py-2"
            placeholder="Enter your Your Age...."
          />
          <label className="text-[#666666] text-[16px]">
            Input Your Favorite Movie{" "}
          </label>
          <input
            value={favouriteMovie}
            onChange={(e) => setFavouriteMovie(e.target.value)}
            type="text"
            className="border-[#666666]  border-[1px] rounded-[12px] h-[56px] mb-[30px] px-4 py-2"
            placeholder="Enter your Your Favorite Movie...."
          />
        </div>
        <div className="flex flex-col">
          <button
            onClick={submitDetails}
            className="bg-[#C4C4C4] border-0 rounded-[40px] h-[64px] text-[#FFFFFF] text-[22px] hover:bg-[#666666]"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Details;
