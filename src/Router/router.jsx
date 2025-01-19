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
import MealDetails from "../Pages/Home/Meals/MealDetails";
import CheckoutForm from "../Pages/Home/Payment/CheckoutForm";
import Payment from "../Pages/Home/Payment/Payment";
import AllMeals from "../Pages/AllMeals/AllMeals";
import RequestedMeals from "../Pages/Dashboard/User/RequestedMeals";
import MyReviews from "../Pages/Dashboard/User/MyReviews";
import PaymentHistory from "../Pages/Dashboard/User/PaymentHistory";
import AdminAllMeals from "../Pages/Dashboard/Admin/AdminAllMeals";
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
        path: "meal/:id",
        element: <MealDetails></MealDetails>,
      },
      {
        path: "checkoutForm/:packageName/:price",
        element: <Payment></Payment>,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "register",
        element: <Register></Register>,
      },
      {
        path: "allMeals",
        element: <AllMeals></AllMeals>,
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
      {
        path: "adminAllMeals",
        element: (
          <AdminRoute>
            <AdminAllMeals></AdminAllMeals>
          </AdminRoute>
        ),
      },
      // User
      {
        path: "myProfile",
        element: <MyProfile></MyProfile>,
      },
      {
        path: "requestedMeals",
        element: <RequestedMeals></RequestedMeals>,
      },
      {
        path: "myReviews",
        element: <MyReviews></MyReviews>,
      },
      {
        path: "paymentHistory",
        element: <PaymentHistory></PaymentHistory>,
      },
    ],
  },
]);
