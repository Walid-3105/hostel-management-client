import React, { useState } from "react";
import {
  FaBars,
  FaHome,
  FaUsers,
  FaList,
  FaUtensils,
  FaUtensilSpoon,
} from "react-icons/fa";
import { GiHotMeal } from "react-icons/gi";
import { MdOutlineUpcoming } from "react-icons/md";
import { ImProfile } from "react-icons/im";
import { VscGitPullRequestCreate, VscPreview } from "react-icons/vsc";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../Hooks/useAdmin";

const Dashboard = () => {
  const [isAdmin] = useAdmin();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      <div>
        {isOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
            onClick={() => setIsOpen(false)}
          ></div>
        )}

        <div
          className={`fixed  min-h-screen  w-64 bg-[#e0dfdfd2] shadow-lg z-20 transform ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 transition-transform duration-300`}
        >
          <h3 className="p-4 text-xl font-bold">Lodge Ease</h3>
          <ul className="menu p-4">
            {isAdmin ? (
              <>
                <li>
                  <NavLink to="/dashboard/adminProfile">
                    <FaHome /> Admin Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/manageUsers">
                    <FaUsers /> Manage Users
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/addMeals">
                    <FaUtensils /> Add Meals
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/adminAllMeals">
                    <FaUtensilSpoon /> All Meals
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/serveMeals">
                    <GiHotMeal /> Serve Meals
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/upComingMeals">
                    <MdOutlineUpcoming /> Upcoming Meals
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink to="/dashboard/myProfile">
                    <ImProfile /> My Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/requestedMeals">
                    <VscGitPullRequestCreate /> Requested Meals
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/myReviews">
                    <VscPreview /> My Reviews
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/paymentHistory">
                    <FaList /> Payment History
                  </NavLink>
                </li>
              </>
            )}
            {/* shared item */}
            <div className="divider"></div>
            <li>
              <NavLink to="/dashboard/overview">
                <FaHome /> Overview
              </NavLink>
            </li>
            <li>
              <NavLink to="/">
                <FaHome /> Home
              </NavLink>
            </li>
          </ul>
        </div>
      </div>

      <div className="flex-1 p-4 md:p-10 ml-0 lg:ml-64 md:ml-64 ">
        <button
          className="md:hidden p-3 bg-gray-200 rounded-full shadow-md"
          onClick={() => setIsOpen(!isOpen)}
        >
          <FaBars size={24} />
        </button>
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
