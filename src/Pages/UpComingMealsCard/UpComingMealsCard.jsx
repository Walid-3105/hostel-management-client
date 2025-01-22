import React, { useEffect, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { FaRegThumbsUp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const UpComingMealsCard = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();

  // Fetch upcoming meals
  const { data: upcomingMeals = [], refetch } = useQuery({
    queryKey: ["upcomingMeals"],
    queryFn: async () => {
      const res = await axiosSecure.get("/upcomingMeals");
      return res.data;
    },
  });

  // Fetch user data for role check
  const { data: userData = [] } = useQuery({
    queryKey: ["userRole", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const userRole = userData[0];
  const isPremium = ["Silver", "Gold", "Platinum"].includes(userRole?.badge);

  // Mutation to update likes
  const likeMutation = useMutation({
    mutationFn: async ({ mealId, newLikes, updatedLikedBy }) => {
      const res = await axiosSecure.patch(`/upcomingMeals/${mealId}`, {
        likes: newLikes,
        likedBy: updatedLikedBy,
      });
      return res.data.likes;
    },
    onSuccess: () => {
      refetch();
    },
  });

  // Handle Like Click
  const handleLike = (meal) => {
    if (!user?.email) {
      Swal.fire({
        title: "Please Login to Like Meals",
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
      return;
    }

    if (!isPremium) {
      toast.error(
        "Only premium members can like upcoming meals. Purchase a package to unlock this feature!"
      );
      return;
    }

    const likedBy = Array.isArray(meal.likedBy) ? meal.likedBy : [];
    console.log(likedBy);

    if (likedBy.includes(user.email)) {
      toast.error("you have already liked this meal");
      return;
    }

    const newLikes = meal.likes + 1;
    const updatedLikedBy = [...likedBy, user.email];
    likeMutation.mutate({ mealId: meal._id, newLikes, updatedLikedBy });
  };

  // Function to publish a meal
  // Function to publish a meal
  const publishMeal = async (meal) => {
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

  useEffect(() => {
    upcomingMeals.forEach((meal) => {
      if (meal.likes >= 10) {
        publishMeal(meal);
      }
    });
  }, [upcomingMeals]); // Runs whenever upcomingMeals data changes

  return (
    <div className="p-5">
      <h2 className="text-2xl font-semibold mb-4">Upcoming Meals</h2>

      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5">
        {upcomingMeals.length > 0 ? (
          upcomingMeals.map((meal) => (
            <div
              key={meal._id}
              className="bg-white shadow-md rounded-md p-4 flex flex-col items-center text-center"
            >
              <img
                src={meal.image}
                alt={meal.title}
                className="w-full h-40 object-cover rounded-md"
              />
              <h3 className="text-lg font-semibold mt-2">{meal.title}</h3>
              <p className="text-sm text-gray-500">{meal.category}</p>
              <p className="text-sm mt-1">{meal.description}</p>

              <div className="flex items-center justify-between w-full mt-3">
                <button
                  className="flex items-center gap-1 bg-blue-500 text-white px-4 py-1 rounded-md"
                  onClick={() => handleLike(meal)}
                  disabled={likeMutation.isLoading}
                >
                  <FaRegThumbsUp className="text-lg" />
                  <span>{meal.likes}</span>
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center w-full">
            No upcoming meals found.
          </p>
        )}
      </div>
    </div>
  );
};

export default UpComingMealsCard;
