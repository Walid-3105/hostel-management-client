import React, { useState } from "react";
import useAuth from "../Hooks/useAuth";
import { FcGoogle } from "react-icons/fc";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAxiosPublic from "../Hooks/useAxiosPublic";

const GoogleUserLogin = () => {
  const { goggleLogin } = useAuth();
  const [error, setError] = useState({});
  const location = useLocation();
  const navigate = useNavigate();

  const handleGoogleSignIn = () => {
    const axiosPublic = useAxiosPublic();
    goggleLogin()
      .then((res) => {
        toast.success("Successfully Log In");
        const userInfo = {
          email: res.user.email,
          name: res.user.displayName,
          badge: "Bronze",
        };
        axiosPublic.post("/users", userInfo).then((res) => {
          // console.log("user added", res.data);
          navigate(location?.state ? location.state : "/");
        });
        // console.log(res.user);
      })
      .catch((err) => {
        setError(err.message);
        // console.log(err.message);
      });
  };
  return (
    <div>
      {/* Goggle */}
      <div className="flex items-center justify-center pb-1">
        <button
          onClick={handleGoogleSignIn}
          className="flex text-center items-center btn text-xl  rounded-lg w-full bg-white border-2 border-[#023E8A] text-[#023E8A]"
        >
          <FcGoogle></FcGoogle>
          Continue With Google
        </button>
      </div>
    </div>
  );
};

export default GoogleUserLogin;
