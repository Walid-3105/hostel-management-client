"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const testimonials = [
  {
    id: 1,
    name: "John Doe",
    review:
      "Amazing hostel! Clean rooms, friendly staff, and great facilities.",
    rating: 4.5,
    image: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    id: 2,
    name: "Sarah Smith",
    review:
      "I had a comfortable stay. The food was great and the environment was peaceful.",
    rating: 5,
    image: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    id: 3,
    name: "Michael Johnson",
    review: "Affordable and well-maintained. The WiFi speed could be better.",
    rating: 4,
    image: "https://randomuser.me/api/portraits/men/2.jpg",
  },
];

const getStars = (rating) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(<FaStar key={i} className="text-yellow-400" />);
    } else if (i - 0.5 === rating) {
      stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
    } else {
      stars.push(<FaRegStar key={i} className="text-gray-300" />);
    }
  }
  return stars;
};

const Testimonials = () => {
  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center mb-6">
        What Our Guests Say
      </h2>
      <Swiper
        slidesPerView={1}
        spaceBetween={20}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        modules={[Pagination, Autoplay]}
        className="w-full max-w-3xl mx-auto"
      >
        {testimonials.map((testimonial) => (
          <SwiperSlide key={testimonial.id}>
            <div className="bg-white shadow-lg p-6 rounded-lg text-center border border-gray-200">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-16 h-16 rounded-full mx-auto mb-3"
              />
              <h3 className="text-lg font-semibold">{testimonial.name}</h3>
              <p className="text-gray-600 mt-2">{testimonial.review}</p>
              <div className="flex justify-center mt-3 text-xl">
                {getStars(testimonial.rating)}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Testimonials;
