import React from "react";
import { Link } from "react-router-dom";

const MealCard = ({ item }) => {
  const { _id, title, image, rating, price } = item || {};

  return (
    <div className="card w-72 bg-white shadow-lg rounded-md overflow-hidden">
      <img src={image} alt={title} className="w-full h-40 object-cover" />
      <div className="p-4">
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-gray-500">Rating: ⭐{rating}</p>
        <p className="text-xl font-bold text-green-600">${price}</p>
        <Link to={`/meal/${_id}`}>
          <button className="btn btn-primary w-full mt-2">View Details</button>
        </Link>
      </div>
    </div>
  );
};

export default MealCard;
