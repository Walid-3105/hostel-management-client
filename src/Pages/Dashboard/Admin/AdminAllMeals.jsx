import React, { useState } from "react";
import { Link } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import useMeals from "../../../Hooks/useMeals";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";
import ReactPaginate from "react-paginate";
import { FaTrashAlt } from "react-icons/fa";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const AdminAllMeals = () => {
  // const [meals, , refetch] = useMeals();

  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const [sortOption, setSortOption] = useState("");

  const {
    data: meals = [],
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["meal", sortOption],
    queryFn: async () => {
      const res = await axiosPublic.get(`/meal?sort=${sortOption}`);
      return res.data;
    },
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState(null);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;
  const offset = currentPage * itemsPerPage;
  const currentMeals = meals.slice(offset, offset + itemsPerPage);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleDeleteMeal = (mealId) => {
    confirmAlert({
      title: "Delete Confirmation",
      message: "Are you sure you want to delete this meal?",
      buttons: [
        {
          label: "Yes, Delete",
          onClick: () => {
            axiosSecure.delete(`/meal/${mealId}`).then((res) => {
              if (res.data.acknowledged) {
                refetch();
              } else {
                alert("Failed to delete meal.");
              }
            });
          },
        },
        {
          label: "Cancel",
          onClick: () => console.log("Delete canceled"),
        },
      ],
    });
  };

  const handleUpdateMeal = (mealId) => {
    const meal = meals.find((meal) => meal._id === mealId);
    setSelectedMeal(meal);
    setIsModalOpen(true);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
    refetch(); // Refetch data when sort option changes
  };

  const handleUpdateSubmit = (updatedMeal) => {
    axiosSecure
      .patch(`/meal/${updatedMeal._id}`, updatedMeal)
      .then((res) => {
        if (res.data.acknowledged) {
          refetch();
          setIsModalOpen(false);
          toast.success("Meal Updated Successfully");
        } else {
          alert("Failed to update meal.");
        }
      })
      .catch((err) => {
        console.error("Update error:", err);
        alert("Failed to update meal.");
      });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto p-5">
      <h2 className="text-2xl font-semibold mb-4">All Meals</h2>
      {/* Sorting Dropdown */}
      <div className="mb-4">
        <label className="mr-2 font-semibold">Sort by:</label>
        <select
          className="border px-3 py-1 rounded"
          value={sortOption}
          onChange={handleSortChange}
        >
          <option value="">Default</option>
          <option value="likes">Most Liked</option>
          <option value="reviews_count">Most Reviewed</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2"></th>
              <th className="border border-gray-300 px-4 py-2">Title</th>
              <th className="border border-gray-300 px-4 py-2">Likes</th>
              <th className="border border-gray-300 px-4 py-2">Reviews</th>
              <th className="border border-gray-300 px-4 py-2">Distributor</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentMeals.map((meal, index) => (
              <tr key={meal._id} className="text-center">
                <td className="border border-gray-300 px-4 py-2">
                  {offset + index + 1}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {meal.title}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {meal.likes || 0}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {meal.reviews_count || 0}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {meal.admin_name || "Unknown"}
                </td>
                <td className="border border-gray-300 px-4 py-2 w-[250px]">
                  <Link to={`/meal/${meal._id}`}>
                    <button className="bg-blue-800 text-white px-3 py-1 rounded mr-5">
                      View
                    </button>
                  </Link>

                  <button
                    onClick={() => handleUpdateMeal(meal._id)}
                    className="bg-green-500 text-white px-3 py-1 rounded mr-5"
                  >
                    Update
                  </button>

                  <button
                    onClick={() => handleDeleteMeal(meal._id)}
                    className="text-red-600 hover:text-blue-600"
                  >
                    <FaTrashAlt size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-8 min-h-[50px]">
        <ReactPaginate
          previousLabel={"← Previous"}
          nextLabel={"Next →"}
          breakLabel={"..."}
          pageCount={Math.ceil(meals.length / itemsPerPage)}
          marginPagesDisplayed={1}
          pageRangeDisplayed={3}
          onPageChange={handlePageChange}
          containerClassName={"pagination flex space-x-2"}
          previousLinkClassName={
            "px-4 py-2 border rounded bg-gray-200 hover:bg-gray-300"
          }
          nextLinkClassName={
            "px-4 py-2 border rounded bg-gray-200 hover:bg-gray-300"
          }
          disabledClassName={"opacity-50 cursor-not-allowed "}
          activeClassName={"bg-blue-500 text-white rounded-full px-2"}
        />
      </div>

      {/* Update Meal Modal */}
      {selectedMeal && isModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="text-lg font-bold mb-4">Update Meal</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdateSubmit(selectedMeal);
              }}
              className="space-y-4"
            >
              <div>
                <label htmlFor="title" className="block">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={selectedMeal?.title || ""}
                  onChange={(e) =>
                    setSelectedMeal({ ...selectedMeal, title: e.target.value })
                  }
                  className="input input-bordered w-full"
                />
              </div>
              <div>
                <label htmlFor="description" className="block">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={selectedMeal?.description || ""}
                  onChange={(e) =>
                    setSelectedMeal({
                      ...selectedMeal,
                      description: e.target.value,
                    })
                  }
                  className="textarea textarea-bordered w-full"
                />
              </div>
              <div className="flex justify-end space-x-2 mt-4">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="btn btn-outline"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAllMeals;
