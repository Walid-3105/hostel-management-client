import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import { createBrowserRouter } from "react-router-dom";
import Login from "../Pages/JoinUs/Login";
import Register from "../Pages/JoinUs/Register";
import Dashboard from "../Layout/Dashboard";
import AddMeals from "../Pages/Dashboard/Admin/AddMeals";
import AdminProfile from "../Pages/Dashboard/Admin/AdminProfile";
import MyProfile from "../Pages/Dashboard/User/MyProfile";
import ManageUsers from "../Pages/Dashboard/Admin/ManageUsers";
import AdminRoute from "./AdminRoute";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "register",
        element: <Register></Register>,
      },
    ],
  },
  {
    path: "dashboard",
    element: <Dashboard></Dashboard>,
    children: [
      // Admin
      {
        path: "adminProfile",
        element: (
          <AdminRoute>
            <AdminProfile></AdminProfile>
          </AdminRoute>
        ),
      },
      {
        path: "manageUsers",
        element: (
          <AdminRoute>
            <ManageUsers></ManageUsers>
          </AdminRoute>
        ),
      },
      {
        path: "addMeals",
        element: (
          <AdminRoute>
            <AddMeals></AddMeals>
          </AdminRoute>
        ),
      },
      // User
      {
        path: "myProfile",
        element: <MyProfile></MyProfile>,
      },
    ],
  },
]);
