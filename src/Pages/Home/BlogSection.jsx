"use client";

import { motion } from "framer-motion";

const blogs = [
  {
    id: 1,
    title: "Top 10 Hostel Living Tips for Students",
    description:
      "Discover the best tips for making your hostel stay comfortable and hassle-free.",
    image: "https://source.unsplash.com/400x250/?hostel,students",
    date: "Feb 15, 2025",
  },
  {
    id: 2,
    title: "Hostel Safety: Essential Precautions for Residents",
    description:
      "Learn about the key safety measures every hostel resident should follow.",
    image: "https://source.unsplash.com/400x250/?safety,security",
    date: "Feb 10, 2025",
  },
  {
    id: 3,
    title: "New Hostel Openings in 2025: Best Places to Stay",
    description:
      "Check out the newest hostels opening this year and find the perfect stay.",
    image: "https://source.unsplash.com/400x250/?hostel,room",
    date: "Feb 5, 2025",
  },
];

const BlogSection = () => {
  return (
    <div className="container mx-auto px-6 py-12">
      <h2 className="text-4xl font-bold text-center mb-10 text-gray-800">
        📰 Latest Blog & News
      </h2>
      <div className="grid md:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <motion.div
            key={blog.id}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="bg-white shadow-xl rounded-lg overflow-hidden border border-gray-200 hover:shadow-2xl transition-all duration-300"
          >
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-5">
              <span className="badge badge-secondary px-3 py-1 mb-3 inline-block">
                {blog.date}
              </span>
              <h3 className="text-xl font-semibold text-gray-800">
                {blog.title}
              </h3>
              <p className="text-gray-600 mt-2">{blog.description}</p>
              <button className="mt-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-5 py-2 rounded-lg hover:opacity-90 transition-all duration-300">
                Read More
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default BlogSection;
