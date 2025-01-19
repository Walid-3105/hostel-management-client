import React from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useUsers from "../../../Hooks/useUsers";

const MyProfile = () => {
  const { userProfile, user } = useUsers();

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-blue-500 h-32 flex justify-center items-center">
          <h2 className="text-white text-3xl font-semibold">My Profile</h2>
        </div>
        <div className="p-6 text-center">
          <img
            src={user?.photoURL}
            alt="User Profile"
            className="w-24 h-24 rounded-full mx-auto border-4 border-white -mt-12"
          />
          <h2 className="text-2xl font-bold mt-4">
            {userProfile?.name || "User Name"}
          </h2>
          <p className="text-gray-600 mt-2">
            {userProfile?.email || "user@example.com"}
          </p>
          <span className="inline-block bg-yellow-500 text-white px-4 py-1 mt-3 rounded-full text-sm font-semibold">
            {userProfile?.badge || "No Badge"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
