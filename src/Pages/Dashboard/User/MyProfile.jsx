import React from "react";
import useUsers from "../../../Hooks/useUsers";

const MyProfile = () => {
  const { userProfile, user } = useUsers();

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-50 rounded-lg shadow-md">
      {/* User Introduction */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <h2 className="text-xl font-bold">
            Hello, <span>{userProfile?.name}</span> 👋
          </h2>
          <p className="text-gray-700 mt-1">
            Welcome to your profile! Here, you can review your details, track
            your activity, and stay connected with the community. Enjoy your
            experience!
          </p>
        </div>
        <div className="text-center">
          <img
            src={user?.photoURL || "https://via.placeholder.com/150"}
            alt="User Profile"
            className="w-40 h-40 rounded-lg border shadow-md"
          />
          <h2 className="text-lg font-semibold mt-2">{userProfile?.name}</h2>
          <p className="text-gray-600">{userProfile?.email}</p>
        </div>
      </div>

      {/* User Stats */}
      <div className="mt-6 p-4 bg-white rounded-lg shadow-sm">
        <p className="text-lg font-medium">
          Account Badge:
          <span className="text-green-600 font-bold text-xl ml-1">
            {userProfile?.badge || "Regular User"}
          </span>
        </p>
        <p className="text-gray-700 mt-2">
          Stay engaged and explore exciting features on Lodge Ease!
        </p>
      </div>
    </div>
  );
};

export default MyProfile;
