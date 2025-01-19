import React from "react";
import useUsers from "../../../Hooks/useUsers";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";

const RequestedMeals = () => {
  const { requests, refetch } = useUsers();
  const axiosSecure = useAxiosSecure();

  const handleCancel = async (mealId) => {
    const res = await axiosSecure.delete(`/request/${mealId}`);
    refetch();
    toast.success(`${requests[0].title} cancel from your Request`);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Requested Meals</h2>

      {requests?.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">Meal Title</th>
                <th className="border border-gray-300 px-4 py-2">Likes</th>
                <th className="border border-gray-300 px-4 py-2">Reviews</th>
                <th className="border border-gray-300 px-4 py-2">Status</th>
                <th className="border border-gray-300 px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((meal) => (
                <tr key={meal._id} className="text-center">
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
        </div>
      ) : (
        <p className="text-gray-500">No requested meals found.</p>
      )}
    </div>
  );
};

export default RequestedMeals;
