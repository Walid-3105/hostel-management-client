import React from "react";
import Banner from "./Banner";
import MealsCategory from "./MealsCategory";
import MembershipSection from "./MembershipSection";
import FeaturedFacilities from "./FeaturedFacilities";

const Home = () => {
  return (
    <div className="min-h-screen">
      <Banner></Banner>
      <MealsCategory></MealsCategory>
      <MembershipSection></MembershipSection>
      <FeaturedFacilities></FeaturedFacilities>
    </div>
  );
};

export default Home;
