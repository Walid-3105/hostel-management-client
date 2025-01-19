import React from "react";
import {
  FaEnvelope,
  FaHome,
  FaList,
  FaUsers,
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

  return (
    <div className="flex">
      <div className="min-h-screen w-64 bg-orange-400">
        <ul className="menu p-4">
          {isAdmin ? (
            <>
              <li>
                <NavLink to="/dashboard/adminProfile">
                  <FaHome></FaHome>
                  Admin Profile
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manageUsers">
                  <FaUsers></FaUsers>
                  Manage Users
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/addMeals">
                  <FaUtensils></FaUtensils>
                  Add Meals
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/addItems">
                  <FaUtensilSpoon></FaUtensilSpoon>
                  All Meals
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/users">
                  <GiHotMeal />
                  Serve Meals
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/users">
                  <MdOutlineUpcoming />
                  Upcoming Meals
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/dashboard/myProfile">
                  <ImProfile />
                  My Profile
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/requestedMeals">
                  <VscGitPullRequestCreate />
                  Requested Meals
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/myReviews">
                  <VscPreview />
                  My Reviews
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/paymentHistory">
                  <FaList></FaList>
                  Payment History
                </NavLink>
              </li>
            </>
          )}
          {/* shared item */}
          <div className="divider"></div>
          <li>
            <NavLink to="/">
              <FaHome></FaHome>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/order/contact">
              <FaEnvelope></FaEnvelope>
              Contact
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="flex-1 p-10">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
