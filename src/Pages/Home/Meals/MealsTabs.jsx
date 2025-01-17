import React from "react";
import MealCard from "./MealCard";

const MealsTabs = ({ items }) => {
  console.log("this is meals", items);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-10">
      {items.map((item) => (
        <MealCard key={item._id} item={item}></MealCard>
      ))}
    </div>
  );
};

export default MealsTabs;
