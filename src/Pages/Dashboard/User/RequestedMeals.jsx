import React, { useState } from "react";
import useUsers from "../../../Hooks/useUsers";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";
import ReactPaginate from "react-paginate";

const RequestedMeals = () => {
  const { requests, refetch } = useUsers();
  const axiosSecure = useAxiosSecure();

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleCancel = async (mealId) => {
    const res = await axiosSecure.delete(`/request/${mealId}`);
    refetch();
    toast.success(`Meal request canceled successfully`);
  };

  const offset = currentPage * itemsPerPage;
  const currentMeals = requests.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(requests.length / itemsPerPage);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Requested Meals</h2>

      {requests?.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2"></th>
                <th className="border border-gray-300 px-4 py-2">Meal Title</th>
                <th className="border border-gray-300 px-4 py-2">Likes</th>
                <th className="border border-gray-300 px-4 py-2">Reviews</th>
                <th className="border border-gray-300 px-4 py-2">Status</th>
                <th className="border border-gray-300 px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentMeals.map((meal, index) => (
                <tr key={meal._id} className="text-center">
                  <td className="border border-gray-300 px-4 py-2">
                    {index + 1}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {meal.title}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {meal.likes}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {meal.reviews_count}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded text-white ${
                        meal.status === "pending"
                          ? "bg-yellow-500"
                          : meal.status === "approved"
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    >
                      {meal.status}
                    </span>
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
                      onClick={() => handleCancel(meal._id)}
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <ReactPaginate
            previousLabel={"← Previous"}
            nextLabel={"Next →"}
            pageCount={pageCount}
            onPageChange={handlePageClick}
            containerClassName={"pagination flex justify-center mt-4"}
            previousLinkClassName={"px-3 py-1 bg-gray-300 rounded mr-2"}
            nextLinkClassName={"px-3 py-1 bg-gray-300 rounded ml-2"}
            disabledClassName={"opacity-50 cursor-not-allowed"}
            activeClassName={"bg-blue-500 text-white px-2 rounded-full"}
          />
        </div>
      ) : (
        <p className="text-gray-500">No requested meals found.</p>
      )}
    </div>
  );
};

export default RequestedMeals;
