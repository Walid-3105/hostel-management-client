import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaRegThumbsUp } from "react-icons/fa";
import { AiFillStar } from "react-icons/ai";
import { useQuery, useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";

const MealDetails = () => {
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const { id } = useParams();

  // Fetch meal details using React Query
  const {
    data: meal = {},
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["meal", id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/meal/${id}`);
      return res.data;
    },
  });

  // State for likes (sync with fetched data)
  const [like, setLike] = useState(0);

  // Sync likes with fetched meal data
  useEffect(() => {
    if (meal.likes !== undefined) {
      setLike(meal.likes);
    }
  }, [meal.likes]);

  // Mutation to update likes on the server
  const likeMutation = useMutation({
    mutationFn: async (newLikes) => {
      const res = await axiosSecure.patch(`/meal/${id}`, { likes: newLikes });
      return res.data.likes;
    },
    onSuccess: (updatedLikes) => {
      setLike(updatedLikes); // Update UI immediately
      refetch(); // Sync with the latest data from the server
    },
  });

  // Handle like button click
  const handleLike = () => {
    const newLikes = like + 1;
    setLike(newLikes); // Optimistically update UI
    likeMutation.mutate(newLikes); // Send update request to the server
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading meal details.</p>;

  return (
    <div className="min-h-screen pt-[64px]">
      <div className="max-w-lg mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <img className="w-full h-56 object-cover" src={meal.image} alt="Meal" />

        <div className="p-5">
          <h2 className="text-xl font-semibold">{meal.category}</h2>
          <p className="text-gray-600 text-sm">By {meal.admin_name}</p>

          <p className="mt-2 text-gray-700">{meal.description}</p>

          <h3 className="mt-3 font-medium">Ingredients:</h3>
          <ul className="list-disc list-inside text-gray-600">
            {meal.ingredients?.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

          <p className="mt-3 text-gray-500 text-sm">
            Posted on: {meal.postTime}
          </p>

          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center">
              <AiFillStar className="text-yellow-500" />
              <span className="ml-1 text-gray-700">{meal.rating}</span>
            </div>

            <button
              onClick={handleLike}
              className="flex items-center gap-1 bg-blue-500 text-white px-3 py-1 rounded-md"
              disabled={likeMutation.isLoading}
            >
              <FaRegThumbsUp /> {like}
            </button>
          </div>

          <div className="mt-5 flex gap-3">
            <button className="w-full bg-green-500 text-white py-2 rounded-md">
              Request Meal
            </button>
            <button className="w-full bg-gray-700 text-white py-2 rounded-md">
              View Reviews
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealDetails;
