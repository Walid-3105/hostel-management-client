import React from "react";
import Banner from "./Banner";
import MealsCategory from "./MealsCategory";
import MembershipSection from "./MembershipSection";
import FeaturedFacilities from "./FeaturedFacilities";
import Testimonials from "./Testimonials";
import OffersSection from "./OffersSection";
import HowItWorks from "./HowItWorks";
import FAQSection from "./FaqSection";

const Home = () => {
  return (
    <div className="min-h-screen">
      <Banner></Banner>
      <MealsCategory></MealsCategory>
      <HowItWorks></HowItWorks>
      <MembershipSection></MembershipSection>
      <FeaturedFacilities></FeaturedFacilities>
      <Testimonials></Testimonials>
      <OffersSection></OffersSection>
      <FAQSection></FAQSection>
    </div>
  );
};

export default Home;
