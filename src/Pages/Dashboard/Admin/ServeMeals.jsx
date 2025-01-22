import React, { useState, useEffect } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { confirmAlert } from "react-confirm-alert";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import ReactPaginate from "react-paginate";

const ServeMeals = () => {
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setCurrentPage(0); // Reset to first page on new search
    }, 500);

    return () => clearTimeout(handler);
  }, [search]);

  const { data: requestedMeals = [], refetch: requestRefetch } = useQuery({
    queryKey: ["requests", debouncedSearch],
    queryFn: async () => {
      const res = await axiosSecure.get(`/requests?search=${debouncedSearch}`);
      return res.data;
    },
    keepPreviousData: true,
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
        },
      ],
    });
  };

  // Pagination logic
  const offset = currentPage * itemsPerPage;
  const currentMeals = requestedMeals.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(requestedMeals.length / itemsPerPage);

  return (
    <div className="p-5">
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-semibold">Requested Meals</h2>
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
              <th className="border px-4 py-2"></th>
              <th className="border px-4 py-2">Title</th>
              <th className="border px-4 py-2">User Email</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentMeals.length > 0 ? (
              currentMeals.map((meal, index) => (
                <tr key={meal._id} className="text-center">
                  <td className="border px-4 py-2">{index + 1}</td>
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

      {/* Pagination Component */}
      {requestedMeals.length > itemsPerPage && (
        <div className="flex justify-center items-center mt-8 min-h-[50px]">
          <ReactPaginate
            previousLabel={"← Previous"}
            nextLabel={"Next →"}
            breakLabel={"..."}
            pageCount={pageCount}
            marginPagesDisplayed={1}
            pageRangeDisplayed={3}
            onPageChange={(selected) => setCurrentPage(selected.selected)}
            containerClassName={"pagination flex space-x-2"}
            previousLinkClassName={
              "px-4 py-2 border rounded bg-gray-200 hover:bg-gray-300"
            }
            nextLinkClassName={
              "px-4 py-2 border rounded bg-gray-200 hover:bg-gray-300"
            }
            disabledClassName={"opacity-50 cursor-not-allowed"}
            activeClassName={"bg-blue-500 text-white rounded-full px-2"}
          />
        </div>
      )}
    </div>
  );
};

export default ServeMeals;
