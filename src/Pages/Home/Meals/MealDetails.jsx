import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaRegThumbsUp } from "react-icons/fa";
import { AiFillStar } from "react-icons/ai";
import { useQuery, useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const MealDetails = () => {
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();
  // users data
  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?email=${user.email}`);
      return res.data;
    },
  });

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
  console.log(meal);

  // State for likes (sync with fetched data)
  const [like, setLike] = useState(0);
  const [showReviewBox, setShowReviewBox] = useState(false);
  const [reviewText, setReviewText] = useState("");

  // Sync likes with fetched meal data
  useEffect(() => {
    if (meal.likes !== undefined) {
      setLike(meal.likes);
    }
  }, [meal.likes]);

  // Handle like button click
  const handleLike = () => {
    if (user && user.email) {
      const newLikes = like + 1;
      setLike(newLikes);
      likeMutation.mutate(newLikes);
    } else {
      Swal.fire({
        title: "Please Login to Like Meal",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Login!",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
    }
  };

  // Mutation to update likes on the server
  const likeMutation = useMutation({
    mutationFn: async (newLikes) => {
      const res = await axiosSecure.patch(`/meal/${id}`, { likes: newLikes });
      return res.data.likes;
    },
    onSuccess: (updatedLikes) => {
      setLike(updatedLikes);
      refetch();
    },
  });

  const handleRequestMeal = async () => {
    if (user && user.email) {
      const loggedInUser = users.find((u) => u.email === user.email);
      const hasValidBadge =
        loggedInUser?.badge &&
        ["Silver", "Gold", "Platinum"].includes(loggedInUser.badge);
      if (hasValidBadge) {
        const requestItem = {
          mealId: meal._id,
          email: user?.email,
          name: user?.displayName,
          title: meal.title,
          reviews_count: meal.reviews_count,
          likes: meal.likes,
          category: meal.category,
          status: "pending",
        };
        const res = await axiosSecure.post("/request", requestItem);
        toast.success("Meal Request added");
        console.log(res.data);
      } else {
        toast.error(
          "You need to purchase a Silver, Gold, or Platinum package to request a meal."
        );
      }
    } else {
      Swal.fire({
        title: "Please Login to Request Meal",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Login!",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
    }
  };

  const handleReviewSubmit = async () => {
    const reviewData = {
      mealId: meal._id,
      title: meal.title,
      email: user.email,
      name: user.displayName,
      likes: meal.likes,
      reviews_count: meal.reviews_count,
      review: reviewText,
    };

    try {
      await axiosSecure.post("/review", reviewData);

      await axiosSecure.patch(`/meal/${meal._id}`, {
        reviews_count: (meal.reviews_count || 0) + 1,
      });
      toast.success("Review submitted successfully!");
      setReviewText(""); // Clear textarea
      setShowReviewBox(false); // Hide review box after submission
      refetch(); // Update review count
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("Failed to submit review!");
    }
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
              className="flex items-center gap-1 bg-blue-500 text-white px-4 py-1 rounded-md w-[80px] h-[32px]"
              disabled={likeMutation.isLoading}
            >
              <FaRegThumbsUp className="text-lg" />
              <span className="min-w-[20px]  text-center">{like}</span>
            </button>
          </div>

          <div className="mt-5 flex gap-3">
            <button
              onClick={handleRequestMeal}
              className="w-full bg-green-500 text-white py-2 rounded-md"
            >
              Request Meal
            </button>
            <button
              className="w-full bg-gray-700 text-white py-2 rounded-md"
              onClick={() => setShowReviewBox(!showReviewBox)}
            >
              Reviews ({meal.reviews_count || 0})
            </button>
          </div>
          {showReviewBox && (
            <div className="mt-4">
              <textarea
                className="w-full p-2 border border-gray-300 rounded-md"
                rows="3"
                placeholder="Write your review..."
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
              />
              <button
                onClick={handleReviewSubmit}
                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Submit Review
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MealDetails;
