import React from "react";
import useMeals from "../../../Hooks/useMeals";

const AdminAllMeals = () => {
  const [meals, refetch] = useMeals();
  console.log(meals);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">All Meals</h2>

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
            {meals?.map((meal, index) => (
              <tr key={meal._id} className="text-center">
                <td className="border border-gray-300 px-4 py-2">
                  {index + 1}
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
                <td className="border border-gray-300 px-4 py-2">
                  <button className="bg-blue-500 text-white px-3 py-1 rounded mr-2">
                    View
                  </button>
                  <button className="bg-green-500 text-white px-3 py-1 rounded mr-2">
                    Update
                  </button>
                  <button className="bg-red-500 text-white px-3 py-1 rounded">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminAllMeals;
