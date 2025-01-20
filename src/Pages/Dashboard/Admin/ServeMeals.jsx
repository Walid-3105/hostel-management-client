import React, { useState, useEffect } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { confirmAlert } from "react-confirm-alert";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";

const ServeMeals = () => {
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Debounce the search input using useEffect
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500); // 500ms delay

    return () => clearTimeout(handler);
  }, [search]);

  const { data: requestedMeals = [], refetch: requestRefetch } = useQuery({
    queryKey: ["requests", debouncedSearch],
    queryFn: async () => {
      const res = await axiosSecure.get(`/requests?search=${debouncedSearch}`);
      return res.data;
    },
    keepPreviousData: true, // Prevents UI flickering
  });

  const handleServe = (id) => {
    confirmAlert({
      title: "Serve Meal Confirmation",
      message: "Are you sure you want to serve this meal?",
      buttons: [
        {
          label: "Yes, Serve",
          onClick: async () => {
            try {
              const res = await axiosSecure.patch(`/request/${id}`, {
                status: "delivered",
              });
              if (res.data.modifiedCount > 0) {
                toast.success("Meal status updated to Delivered!");
                requestRefetch();
              } else {
                toast.error("Failed to update status.");
              }
            } catch (error) {
              toast.error("Error updating meal status.");
              console.error(error);
            }
          },
        },
        {
          label: "Cancel",
          onClick: () => console.log("Serve action canceled"),
        },
      ],
    });
  };

  return (
    <div className="p-5">
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-semibold">Requested Meals</h2>
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search meals..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered w-full max-w-md"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="table-auto border-collapse w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Title</th>
              <th className="border px-4 py-2">User Email</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {requestedMeals.length > 0 ? (
              requestedMeals.map((meal) => (
                <tr key={meal._id} className="text-center">
                  <td className="border px-4 py-2">{meal.title}</td>
                  <td className="border px-4 py-2">{meal.email}</td>
                  <td className="border px-4 py-2">{meal.name}</td>
                  <td className="border px-4 py-2">
                    <span
                      className={`px-3 py-1 rounded-full text-white ${
                        meal.status === "pending"
                          ? "bg-yellow-500"
                          : "bg-green-500"
                      }`}
                    >
                      {meal.status}
                    </span>
                  </td>
                  <td className="border px-4 py-2">
                    <button
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 disabled:opacity-50"
                      onClick={() => handleServe(meal._id)}
                      disabled={meal.status === "delivered"}
                    >
                      {meal.status === "delivered" ? "Served" : "Serve"}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="border px-4 py-2 text-center text-gray-500"
                >
                  No meals found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ServeMeals;
