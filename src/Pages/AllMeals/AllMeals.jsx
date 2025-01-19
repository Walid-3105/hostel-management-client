import React, { useState } from "react";
import { Link } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { use } from "react";

const AllMeals = () => {
  const axiosPublic = useAxiosPublic();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [priceRange, setPriceRange] = useState(200);

  const { data: meals = [] } = useQuery({
    queryKey: ["meals", search, category, priceRange],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/meal?search=${search}&category=${category}&price=${priceRange}`
      );
      return res.data;
    },
  });
  console.log(meals);
  return (
    <div className="min-h-screen pt-20">
      All Meals Here:{meals.length}
      <div className="flex justify-center mb-4">
        {/* 🔍 Search Input */}
        <input
          type="text"
          placeholder="Search meals..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered w-full max-w-md"
        />
      </div>
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="select select-bordered w-full max-w-xs"
      >
        <option value="">All Categories</option>
        <option value="breakfast">Breakfast</option>
        <option value="lunch">Lunch</option>
        <option value="dinner">Dinner</option>
      </select>
      {/* 💰 Price Range Filter */}
      <div className="flex flex-col items-center">
        <label className="font-semibold">Max Price: ${priceRange}</label>
        <input
          type="range"
          min="50"
          max="200"
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)}
          className="range w-48"
        />
      </div>
      <div>
        {meals.map((meal) => (
          <div
            key={meal._id}
            meal={meal}
            className="card w-72 bg-white shadow-lg rounded-md overflow-hidden"
          >
            <img
              src={meal.image}
              alt={meal.title}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold">{meal.title}</h2>
              <p className="text-gray-500">Rating: ⭐{meal.rating}</p>
              <p className="text-xl font-bold text-green-600">${meal.price}</p>
              <p className="text-xl font-bold">{meal.category}</p>
              <Link to={`/meal/${meal._id}`}>
                <button className="btn btn-primary w-full mt-2">
                  View Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllMeals;
