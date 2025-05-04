import React, { useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import toast from "react-hot-toast";
import useUsers from "../Hooks/useUsers";

const NavBar = () => {
  const { user, logOut } = useAuth();
  const { userProfile } = useUsers();
  const [isHovering, setIsHovering] = useState(false);
  const profile = user?.photoURL;
  const displayName = user?.displayName;

  const handleLogout = () => {
    logOut()
      .then(() => {
        toast.success("Logged Out Successfully");
      })
      .catch((error) => {
        console.error("Logout Error:", error.message);
        toast.error("An error occurred while logging out. Please try again.");
      });
  };

  const navItems = (
    <>
      <li>
        <Link
          to={"/"}
          className="text-gray-700 font-medium hover:text-blue-600 hover:scale-105 transition-transform duration-200"
        >
          Home
        </Link>
      </li>
      <li>
        <Link
          to={"/allMeals"}
          className="text-gray-700 font-medium hover:text-blue-600 hover:scale-105 transition-transform duration-200"
        >
          Meals
        </Link>
      </li>
      <li>
        <Link
          to={"/upComingMealsCard"}
          className="text-gray-700 font-medium hover:text-blue-600 hover:scale-105 transition-transform duration-200"
        >
          Upcoming Meals
        </Link>
      </li>
    </>
  );

  return (
    <div className="navbar bg-white fixed z-20 top-0 left-0 right-0 shadow-lg px-4 lg:px-12 py-1">
      <div className="navbar-start">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost lg:hidden p-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu dropdown-content bg-white rounded-lg shadow-xl mt-3 w-64 p-4 z-10"
          >
            {navItems}
          </ul>
        </div>
        <Link
          to="/"
          className="text-2xl font-bold text-blue-700 hover:text-blue-800 transition-colors"
        >
          LodgeEase
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal space-x-6">{navItems}</ul>
      </div>
      <div className="navbar-end">
        {user && user.email ? (
          <div
            className="relative flex items-center gap-2"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <img
              className="w-10 h-10 rounded-full border-2 border-blue-100 hover:scale-105 transition-transform duration-200"
              src={profile || "https://via.placeholder.com/150"}
              alt="User Profile"
              referrerPolicy="no-referrer"
            />
            {isHovering && (
              <div className="absolute top-10 right-0 bg-white rounded-lg shadow-xl p-4 w-48 z-10 border border-gray-100">
                <p className="text-sm font-medium text-gray-800 mb-2">
                  {displayName || "Anonymous User"}
                </p>
                <Link
                  to={
                    userProfile?.role === "admin"
                      ? "/dashboard/adminProfile"
                      : "/dashboard/myProfile"
                  }
                  className="block w-full text-center py-1 px-4 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 hover:scale-105 transition-all duration-200 mb-2"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full py-1 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 hover:scale-105 transition-all duration-200"
                >
                  Log Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link
            to={"/login"}
            className="text-lg font-semibold text-blue-600 hover:text-blue-800 hover:scale-105 transition-all duration-200"
          >
            Join Us
          </Link>
        )}
      </div>
    </div>
  );
};

export default NavBar;
