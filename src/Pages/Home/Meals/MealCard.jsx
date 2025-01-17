import React from "react";

const MealCard = ({ item }) => {
  const { title, image, rating, price } = item || {};
  console.log(image);

  return (
    <div className="card w-72 bg-white shadow-lg rounded-md overflow-hidden">
      <img src={image} alt={title} className="w-full h-40 object-cover" />
      <div className="p-4">
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-gray-500">Rating: ⭐{rating}</p>
        <p className="text-xl font-bold text-green-600">${price}</p>
        <button className="btn btn-primary w-full mt-2">View Details</button>
      </div>
    </div>
  );
};

export default MealCard;
