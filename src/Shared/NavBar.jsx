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
        <Link to={"/"}>Home</Link>
      </li>
      <li>
        <Link to={"/allMeals"}>Meals</Link>
      </li>
      <li>
        <Link to={"/upComingMealsCard"}>Upcoming Meals</Link>
      </li>
    </>
  );
  return (
    <div>
      <div className="navbar bg-base-200 fixed z-10 mx-auto right-0 top-0 px-4 lg:px-10">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
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
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {navItems}
            </ul>
          </div>
          <a className="btn btn-ghost text-xl">LodgeEase</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navItems}</ul>
        </div>
        <div className="navbar-end">
          {user && user.email ? (
            <div
              className="flex items-center gap-2 relative"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              {isHovering && (
                <div className="absolute p-2 w-36 rounded-md bg-gray-400 shadow-md top-10 -left-16 z-10">
                  <p className="text-sm mb-1 text-white">
                    {displayName || "Anonymous User"}
                  </p>
                  {/* todo : make dashboard route ternary if user is admin opening route is adminProfile else User Profile */}
                  <Link
                    to={
                      userProfile?.role === "admin"
                        ? "/dashboard/adminProfile"
                        : "/dashboard/myProfile"
                    }
                    className="btn btn-sm mb-1"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="btn btn-sm bg-[#0f9ccf] text-white hover:bg-sky-900 rounded-xl"
                  >
                    Log-Out
                  </button>
                </div>
              )}
              {/* Profile Image */}
              <img
                className="w-8 h-8 lg:w-10 lg:h-10 rounded-full border-2 border-white"
                src={profile || "https://via.placeholder.com/150"}
                alt="User Profile"
              />
            </div>
          ) : (
            <Link to={"/login"}>Join Us</Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
