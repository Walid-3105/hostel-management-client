import React from "react";
import MealCard from "./MealCard";

const MealsTabs = ({ items }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-10">
      {items.slice(0, 4).map((item) => (
        <MealCard key={item._id} item={item}></MealCard>
      ))}
    </div>
  );
};

export default MealsTabs;
