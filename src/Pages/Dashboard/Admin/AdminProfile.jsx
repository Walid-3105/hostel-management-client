import React from "react";
import useUsers from "../../../Hooks/useUsers";

const AdminProfile = () => {
  const { user, userProfile, adminMeals } = useUsers();

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-50 rounded-lg shadow-md">
      {/* Admin Introduction */}
      <div className="flex justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold">
            Welcome, <span>{userProfile?.name}</span> 👋
          </h2>
          <p className="text-gray-700 mt-1">
            As an admin, you have the power to manage meals, review user
            interactions, and ensure a great experience for all users. Keep up
            the great work!
          </p>
        </div>
        <div className="text-center">
          <img
            src={user?.photoURL}
            alt="Admin"
            className="w-40 h-40 rounded-lg border"
          />
          <h2 className="text-lg font-semibold mt-2">{userProfile?.name}</h2>
          <p className="text-gray-600">{userProfile?.email}</p>
        </div>
      </div>

      {/* Admin Stats */}
      <div className="mt-6 p-4 bg-white rounded-lg shadow-sm">
        <p className="text-lg font-medium">
          Meals Added:
          <span className="text-blue-600 font-bold text-xl ml-1">
            {adminMeals?.length || 0}
          </span>
        </p>
        <p className="text-gray-700 mt-2">
          Keep adding delicious meals and delight users with your amazing
          culinary choices!
        </p>
      </div>
    </div>
  );
};

export default AdminProfile;
