import React from "react";
import Banner from "./Banner";
import MealsCategory from "./MealsCategory";
import MembershipSection from "./MembershipSection";
import FeaturedFacilities from "./FeaturedFacilities";
import Testimonials from "./Testimonials";
import OffersSection from "./OffersSection";
import HowItWorks from "./HowItWorks";
import FAQSection from "./FaqSection";
import StudentLifeSection from "./StudentLifeSection ";

const Home = () => {
  return (
    <div className="min-h-screen">
      <Banner />
      <MealsCategory />
      <HowItWorks />
      <MembershipSection />
      <FeaturedFacilities />
      <StudentLifeSection />
      <Testimonials />
      <OffersSection />
      <FAQSection />
    </div>
  );
};

export default Home;
