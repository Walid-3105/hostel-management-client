import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";

const AllMeals = () => {
  const axiosPublic = useAxiosPublic();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [priceRange, setPriceRange] = useState(200);
  const [meals, setMeals] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["meal", search, category, priceRange],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/meal?search=${search}&category=${category}&price=${priceRange}`
      );
      return res.data;
    },
  });

  const loadMoreMeals = () => {
    if (data?.length > meals.length) {
      setMeals((prevMeals) => [
        ...prevMeals,
        ...data.slice(meals.length, meals.length + 6),
      ]);
    } else {
      setHasMore(false);
    }
  };

  useEffect(() => {
    if (data && data.length > 0) {
      setMeals(data.slice(0, 8)); // Load first 6 meals initially
    }
  }, [data]);

  const filteredMeals = meals.filter((meal) => {
    const matchesSearch =
      (meal.title && meal.title.toLowerCase().includes(search.toLowerCase())) ||
      (meal.category &&
        meal.category.toLowerCase().includes(search.toLowerCase()));
    const matchesCategory = category
      ? meal.category.toLowerCase() === category.toLowerCase()
      : true;
    const matchesPrice = meal.price && parseFloat(meal.price) <= priceRange;

    return matchesSearch && matchesCategory && matchesPrice;
  });

  const noMealsFound = filteredMeals.length === 0 && !isLoading && !isError;

  return (
    <div className="min-h-screen pt-20 w-11/12 mx-auto">
      <div className="flex flex-col lg:flex-row md:flex-row justify-between mt-4">
        <h3 className="text-2xl marker:lg:text-3xl font-bold">
          The Ultimate Meal Selection
        </h3>
        <div className="flex justify-center mb-4 border rounded-lg mt-3 lg:mt-0">
          {/* search */}
          <input
            type="text"
            placeholder="Search meals..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input input-bordered w-full max-w-md"
          />
          {/* category */}
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
        </div>
      </div>

      {/* price */}
      <div className="flex flex-col items-center mb-4">
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

      {noMealsFound && (
        <p className="text-center text-xl font-semibold text-red-600">
          No meals found matching your filters.
        </p>
      )}

      <InfiniteScroll
        dataLength={filteredMeals.length}
        next={loadMoreMeals}
        hasMore={hasMore}
        loader={<p>Loading more meals...</p>}
        endMessage={<p className="mt-2">No more meals to load</p>}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredMeals.map((meal) => (
            <div
              key={meal._id}
              meal={meal}
              className="card w-full lg:w-72 bg-white shadow-lg rounded-md overflow-hidden"
            >
              <img
                src={meal.image}
                alt={meal.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold">{meal.title}</h2>
                <p className="text-xl font-bold text-green-600">
                  ${meal.price}
                </p>
                <p className="text-xl font-bold">{meal.category}</p>
                <Link to={`/meal/${meal._id}`}>
                  <button className="btn btn-sm btn-primary w-full mt-2">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default AllMeals;
