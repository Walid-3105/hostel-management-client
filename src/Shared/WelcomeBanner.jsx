import React from "react";

const WelcomeBanner = () => {
  return (
    <div className="bg-[#023E8A]  text-white h-screen lg:min-h-screen ">
      <div className="p-5 py-10 md:p-48 lg:p-62 flex-row justify-center items-center space-y-11">
        <h3 className="text-4xl">Welcome to Lodge Edge</h3>
        <p className="text-gray-400">
          Lodge Ease is a comprehensive hostel management platform designed to
          simplify accommodation management for both hostel owners and
          residents. From seamless room bookings and real-time availability
          tracking to automated billing and user-friendly dashboards, Lodge Ease
          ensures an efficient and hassle-free experience. Built with modern
          technologies like React and MongoDB, our platform offers a secure,
          intuitive, and responsive interface.
        </p>
        <p>
          Join LodgeEase and share your thoughts with the world through our
          platform, where your voice makes an impact!
        </p>
      </div>
    </div>
  );
};

export default WelcomeBanner;
