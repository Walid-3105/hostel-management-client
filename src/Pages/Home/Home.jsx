import React from "react";
import Banner from "./Banner";
import MealsCategory from "./MealsCategory";
import MembershipSection from "./MembershipSection";

const Home = () => {
  return (
    <div className="min-h-screen">
      <Banner></Banner>
      <MealsCategory></MealsCategory>
      <MembershipSection></MembershipSection>
    </div>
  );
};

export default Home;
