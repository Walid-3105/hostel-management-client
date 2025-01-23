import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const AddUpcomingMealModal = ({ closeModal, refetch }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const imageFile = { image: data.image[0] };
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    const mealData = {
      title: data.title,
      category: data.category,
      image: res.data.data.display_url,
      ingredients: data.ingredients.split(","),
      description: data.description,
      price: parseFloat(data.price),
      postTime: new Date().toISOString(),
      admin_name: user.displayName,
      admin_email: user.email,
      likes: 0,
      reviews_count: 0,
    };

    try {
      const res = await axiosSecure.post("/upcomingMeals", mealData);
      if (res.data.insertedId) {
        toast.success(`${data.title} added as an upcoming meal!`);
        reset();
        closeModal();
        refetch();
      }
    } catch (error) {
      toast.error("Failed to add upcoming meal.");
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h3 className="text-xl font-semibold mb-4">Add Upcoming Meal</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            {...register("title", { required: true })}
            placeholder="Meal Title"
            className="input input-bordered w-full"
          />
          {errors.title && (
            <span className="text-red-500">Title is required</span>
          )}

          <select
            defaultValue="default"
            {...register("category", { required: true })}
            className="select select-bordered w-full"
          >
            <option disabled value="default">
              Select a category
            </option>
            <option value="breakfast">Breakfast</option>
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
          </select>
          {errors.category && (
            <span className="text-red-500">Category is required</span>
          )}

          {/*meals image */}
          <input
            type="file"
            {...register("image", { required: true })}
            className="file-input w-full"
          />
          {errors.image && (
            <span className="text-red-500">Image is required</span>
          )}

          <input
            {...register("ingredients", { required: true })}
            placeholder="Ingredients (comma separated)"
            className="input input-bordered w-full"
          />
          {errors.ingredients && (
            <span className="text-red-500">Ingredients are required</span>
          )}

          <textarea
            {...register("description", { required: true })}
            placeholder="Description"
            className="textarea textarea-bordered w-full"
          />
          {errors.description && (
            <span className="text-red-500">Description is required</span>
          )}

          <input
            type="number"
            {...register("price", { required: true })}
            placeholder="Price"
            className="input input-bordered w-full"
          />
          {errors.price && (
            <span className="text-red-500">Price is required</span>
          )}

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={closeModal}
            >
              Cancel
            </button>
            <button type="submit" className="btn bg-blue-800 text-white">
              Add Meal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUpcomingMealModal;
