import axios from "axios";
import { Bar } from "react-chartjs-2";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import useAdmin from "../Hooks/useAdmin";
import { useQuery } from "@tanstack/react-query";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const fetchDashboardData = async (isAdmin, axiosSecure) => {
  if (isAdmin) {
    const [users, meals, payments, requests] = await Promise.all([
      axiosSecure.get("/allUsers"),
      axiosSecure.get("/meal"),
      axiosSecure.get("/payments"),
      axiosSecure.get("/requests"),
    ]);
    return {
      userCount: users.data.length,
      mealCount: meals.data.length,
      paymentCount: payments.data.length,
      requestsCount: requests.data.length,
    };
  } else {
    const [meals, payments] = await Promise.all([
      axios.get("/userMeals"),
      axios.get("/userPayments"),
    ]);
    return {
      mealCount: meals.data.length,
      paymentCount: payments.data.length,
    };
  }
};

const OverviewPage = () => {
  const [isAdmin] = useAdmin();
  const axiosSecure = useAxiosSecure();

  const { data, isLoading, error } = useQuery({
    queryKey: ["dashboardData", isAdmin],
    queryFn: () => fetchDashboardData(isAdmin, axiosSecure),
    staleTime: 60000,
  });

  const chartData = isAdmin
    ? {
        labels: ["Data"],
        datasets: [
          {
            label: "Total Users",
            data: [data?.userCount || 0],
            backgroundColor: "#3B82F6",
          },
          {
            label: "Total Meals",
            data: [data?.mealCount || 0],
            backgroundColor: "#34D399",
          },
          {
            label: "Total Payments",
            data: [data?.paymentCount || 0],
            backgroundColor: "#F59E0B",
          },
          {
            label: "Total Requests",
            data: [data?.requestsCount || 0],
            backgroundColor: "#EF4444",
          },
        ],
      }
    : {
        labels: ["Data"],
        datasets: [
          {
            label: "Total Meals",
            data: [data?.mealCount || 0],
            backgroundColor: "#34D399",
          },
          {
            label: "Total Payments",
            data: [data?.paymentCount || 0],
            backgroundColor: "#F59E0B",
          },
        ],
      };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full p-6">
        <p className="text-xl font-bold">Loading...</p>
      </div>
    );
  }

  if (error) {
    return <div>Error loading data</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        {isAdmin ? "Admin Dashboard" : "User Dashboard"}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {isAdmin ? (
          <>
            <div className="card w-full bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="text-lg font-medium">Total Users</h2>
                <p className="text-3xl font-bold">{data.userCount}</p>
              </div>
            </div>
            <div className="card w-full bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="text-lg font-medium">Total Meals</h2>
                <p className="text-3xl font-bold">{data.mealCount}</p>
              </div>
            </div>
            <div className="card w-full bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="text-lg font-medium">Total Payments</h2>
                <p className="text-3xl font-bold">{data.paymentCount}</p>
              </div>
            </div>
            <div className="card w-full bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="text-lg font-medium">Total Requests</h2>
                <p className="text-3xl font-bold">{data.requestsCount}</p>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="card w-full bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="text-lg font-medium">My Meals</h2>
                <p className="text-3xl font-bold">{data.mealCount}</p>
              </div>
            </div>
            <div className="card w-full bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="text-lg font-medium">My Payments</h2>
                <p className="text-3xl font-bold">{data.paymentCount}</p>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="card w-full bg-base-100 shadow-xl">
        <div className="card-body" style={{ height: "300px" }}>
          <h2 className="text-xl font-medium mb-4">Overview Chart</h2>
          <Bar
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default OverviewPage;
