import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";
import AddUpcomingMealModal from "./AddUpcomingMealModal";
import ReactPaginate from "react-paginate";

const UpcomingMeals = () => {
  const axiosSecure = useAxiosSecure();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const mealsPerPage = 10;

  const { data: upcomingMeals = [], refetch } = useQuery({
    queryKey: ["upcomingMeals"],
    queryFn: async () => {
      const res = await axiosSecure.get("/upcomingMeals");
      return res.data.sort((a, b) => b.likes - a.likes);
    },
  });

  // Calculate pagination
  const offset = currentPage * mealsPerPage;
  const paginatedMeals = upcomingMeals.slice(offset, offset + mealsPerPage);
  const pageCount = Math.ceil(upcomingMeals.length / mealsPerPage);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handlePublish = async (meal) => {
    try {
      const publishData = {
        title: meal.title,
        category: meal.category,
        image: meal.image,
        ingredients: meal.ingredients,
        description: meal.description,
        price: meal.price,
        postTime: new Date().toISOString(),
        admin_name: meal.admin_name,
        admin_email: meal.admin_email,
        likes: meal.likes,
        reviews_count: meal.reviews_count,
      };

      // Add to the main meals collection
      const res = await axiosSecure.post("/meal", publishData);

      if (res.data.insertedId) {
        // Delete from upcoming meals after successful publish
        await axiosSecure.delete(`/upcomingMeals/${meal._id}`);
        toast.success(`${meal.title} published successfully!`);
        refetch();
      }
    } catch (error) {
      toast.error("Failed to publish the meal.");
      console.error(error);
    }
  };

  return (
    <div className="p-5">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Upcoming Meals</h2>
        <button
          className="btn bg-blue-800 text-white"
          onClick={() => setIsModalOpen(true)}
        >
          Add Upcoming Meal
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="table-auto border-collapse w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Title</th>
              <th className="border px-4 py-2">Category</th>
              <th className="border px-4 py-2">Likes</th>
              <th className="border px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedMeals.length > 0 ? (
              paginatedMeals.map((meal) => (
                <tr key={meal._id} className="text-center">
                  <td className="border px-4 py-2">{meal.title}</td>
                  <td className="border px-4 py-2">{meal.category}</td>
                  <td className="border px-4 py-2">{meal.likes}</td>
                  <td className="border px-4 py-2">
                    <button
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                      onClick={() => handlePublish(meal)}
                    >
                      Publish
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="border px-4 py-2 text-center text-gray-500"
                >
                  No upcoming meals found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-8 min-h-[50px]">
        <ReactPaginate
          previousLabel={"← Previous"}
          nextLabel={"Next →"}
          breakLabel={"..."}
          pageCount={pageCount}
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

      {/* Add Upcoming Meal Modal */}
      {isModalOpen && (
        <AddUpcomingMealModal
          closeModal={() => setIsModalOpen(false)}
          refetch={refetch}
        />
      )}
    </div>
  );
};

export default UpcomingMeals;
