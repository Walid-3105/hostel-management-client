import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";
import AddUpcomingMealModal from "./AddUpcomingMealModal";

const UpcomingMeals = () => {
  const axiosSecure = useAxiosSecure();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch upcoming meals sorted by likes
  const { data: upcomingMeals = [], refetch } = useQuery({
    queryKey: ["upcomingMeals"],
    queryFn: async () => {
      const res = await axiosSecure.get("/upcomingMeals");
      return res.data.sort((a, b) => b.likes - a.likes); // Sort by likes (highest first)
    },
  });

  // Handle publishing a meal
  const handlePublish = async (meal) => {
    try {
      const publishMeal = {
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
      const res = await axiosSecure.post("/meal", publishMeal);

      if (res.data.insertedId) {
        // Delete from upcoming meals after successful publish
        await axiosSecure.delete(`/upcomingMeals/${meal._id}`);
        toast.success(`${meal.title} published successfully!`);
        refetch(); // Refresh the data
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
          className="btn btn-primary"
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
            {upcomingMeals.length > 0 ? (
              upcomingMeals.map((meal) => (
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
