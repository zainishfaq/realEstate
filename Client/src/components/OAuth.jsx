import React from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
  
      const result = await signInWithPopup(auth, provider);
  
      const res = await axios.post(
        "http://localhost:3000/google",
        {
          username:result.user.displayName,
          email: result.user.email,
          imageurl: result.user.photoURL,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      dispatch(
        signInSuccess({
          token: res.data.token,
          avatar: result.user.photoURL,
          user: res.data.user, 
        })
      );
  
      navigate("/profile");
    } catch (error) {
      console.log("Not able to SignIn with Google", error);
    }
  };

  return (
    <button
      type="button"
      onClick={handleGoogleClick}
      className="bg-red-700 text-white text-center p-3 uppercase rounded-md hover:bg-gray-900"
    >
      Continue with Google
    </button>
  );
}

export default OAuth;
