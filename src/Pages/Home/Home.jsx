import React from "react";
import Banner from "./Banner";
import MealsCategory from "./MealsCategory";

const Home = () => {
  return (
    <div className="min-h-screen">
      <Banner></Banner>
      <MealsCategory></MealsCategory>
    </div>
  );
};

export default Home;
