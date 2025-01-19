import React from "react";
import useUsers from "../../../Hooks/useUsers";

const AdminProfile = () => {
  const { user, userProfile, adminMeals } = useUsers();
  console.log(user);

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center gap-4">
        <img
          src={user?.photoURL}
          alt="Admin"
          className="w-16 h-16 rounded-full border"
        />
        <div>
          <h2 className="text-xl font-bold">{userProfile?.name}</h2>
          <p className="text-gray-600">{userProfile?.email}</p>
        </div>
      </div>
      <div className="mt-4">
        <p className="text-lg font-medium">
          Meals Added:
          <span className="text-blue-600">{adminMeals?.length || 0}</span>
        </p>
      </div>
    </div>
  );
};

export default AdminProfile;
