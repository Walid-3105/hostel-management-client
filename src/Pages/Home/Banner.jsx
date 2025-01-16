import React from "react";
import banner from "../../assets/hostel-banner.jpg";

const Banner = () => {
  return (
    <div className="pt-[68px]">
      <img className="h-[550px] w-full bg-cover" src={banner} alt="" />
    </div>
  );
};

export default Banner;
