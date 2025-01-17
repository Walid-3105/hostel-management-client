import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../Hooks/useAuth";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?expiration=600&key=${image_hosting_key}`;

const AddMeals = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);

    // image upload
    const imageFile = { image: data.image[0] };
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    if (res.data.success) {
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
        rating: 0,
        likes: 0,
        reviews_count: 0,
      };

      const mealRes = await axiosSecure.post("/meals", mealData);
      console.log(mealRes.data);
      if (mealRes.data.insertedId) {
        toast.success(`${data.title} added Successfully`);
        reset();
      }
    }
  };
  return (
    <div>
      <h3 className="text-3xl">Add Meals Here</h3>
      <div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 p-4 bg-white shadow-md rounded-md"
        >
          {/*meal title */}
          <input
            {...register("title", { required: true })}
            placeholder="Meal Title"
            className="input input-bordered w-full"
          />
          {errors.title && (
            <span className="text-red-500">Title is required</span>
          )}
          {/*meal category */}
          <div className="form-control w-full my-6">
            <label className="label">
              <span className="label-text">Category*</span>
            </label>
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
          </div>
          {/*meals image */}
          <input
            type="file"
            {...register("image", { required: true })}
            className="file-input w-full"
          />
          {errors.image && (
            <span className="text-red-500">Image is required</span>
          )}
          {/* Meals ingredients */}

          <input
            {...register("ingredients", { required: true })}
            placeholder="Ingredients (comma separated)"
            className="input input-bordered w-full"
          />
          {errors.ingredients && (
            <span className="text-red-500">Ingredients are required</span>
          )}
          {/* meals description */}

          <textarea
            {...register("description", { required: true })}
            placeholder="Description"
            className="textarea textarea-bordered w-full"
          />
          {errors.description && (
            <span className="text-red-500">Description is required</span>
          )}
          {/* meals price */}
          <input
            type="number"
            step="0.01"
            {...register("price", { required: true })}
            placeholder="Price"
            className="input input-bordered w-full"
          />
          {errors.price && (
            <span className="text-red-500">Price is required</span>
          )}
          {/* admin name */}
          <input
            type="text"
            value={user.displayName}
            readOnly
            className="input input-bordered w-full bg-gray-200"
          />
          {/* admin email */}
          <input
            type="email"
            value={user.email}
            readOnly
            className="input input-bordered w-full bg-gray-200"
          />

          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Add Meal"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddMeals;
