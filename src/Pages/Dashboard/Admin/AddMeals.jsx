import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAdmin from "../../../Hooks/useAdmin";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";

const AddMeals = () => {
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    console.log(data);
  };
  return (
    <div>
      <h3 className="text-3xl">Add Meals Here</h3>
      <div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 p-4 bg-white shadow-md rounded-md"
        >
          <input
            {...register("title", { required: true })}
            placeholder="Meal Title"
            className="input input-bordered w-full"
          />
          {errors.title && (
            <span className="text-red-500">Title is required</span>
          )}

          <input
            {...register("category", { required: true })}
            placeholder="Category"
            className="input input-bordered w-full"
          />
          {errors.category && (
            <span className="text-red-500">Category is required</span>
          )}

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
            step="0.01"
            {...register("price", { required: true })}
            placeholder="Price"
            className="input input-bordered w-full"
          />
          {errors.price && (
            <span className="text-red-500">Price is required</span>
          )}

          <input
            type="text"
            value={user.displayName}
            readOnly
            className="input input-bordered w-full bg-gray-200"
          />
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
