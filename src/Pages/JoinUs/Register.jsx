import React, { useState } from "react";
import { FaArrowLeft, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAuth from "../../Hooks/useAuth";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import GoogleUserLogin from "../../Shared/GoogleUserLogin";

const Register = () => {
  const { createUser, updateUserProfile } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // Form submission handler
  const onSubmit = async (data) => {
    const { name, email, photo, password } = data;
    createUser(email, password).then((res) => {
      updateUserProfile({ displayName: name, photoURL: photo });
      reset();
      const userInfo = {
        name,
        email,
      };
      axiosPublic.post("/users", userInfo).then((res) => {
        console.log("user added successfully");
        navigate("/");
      });

      toast.success("User created successfully!");
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <div className="w-full flex justify-center items-center">
        <div className="card w-full md:max-w-[380px] lg:max-w-[440px] p-10 mt-6">
          <div className="mb-10">{/* <Logo /> */}</div>
          <div className="font-semibold mb-4">
            <Link to="/" className="flex gap-2 text-center items-center">
              <FaArrowLeft />
              Home
            </Link>
          </div>
          <h2 className="text-2xl font-bold text-left">Register</h2>
          <p className="text-left font-semibold mb-2">
            Already have an account?{" "}
            <Link to="/login" className="text-[#023E8A] pl-1">
              Login
            </Link>
          </p>

          {/* Form using React Hook Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="pb-3">
            {/* Name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-gray-700 font-semibold">
                  Name
                </span>
              </label>
              <input
                {...register("name", { required: "Name is required" })}
                type="text"
                placeholder="Enter your name"
                className="input input-bordered"
              />
              {errors.name && (
                <span className="text-red-600 text-sm">
                  {errors.name.message}
                </span>
              )}
            </div>

            {/* Image URL */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-gray-700 font-semibold">
                  Image URL
                </span>
              </label>
              <input
                {...register("photo", {
                  required: "Image URL is required",
                  pattern: {
                    value: /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg))$/i,
                    message: "Enter a valid image URL",
                  },
                })}
                type="text"
                placeholder="Enter image URL"
                className="input input-bordered"
              />
              {errors.photo && (
                <span className="text-red-600 text-sm">
                  {errors.photo.message}
                </span>
              )}
            </div>

            {/* Email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-gray-700 font-semibold">
                  Email
                </span>
              </label>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email",
                  },
                })}
                type="email"
                placeholder="Enter your email"
                className="input input-bordered"
              />
              {errors.email && (
                <span className="text-red-600 text-sm">
                  {errors.email.message}
                </span>
              )}
            </div>

            {/* Password */}
            <div className="form-control relative">
              <label className="label">
                <span className="label-text text-gray-700 font-semibold">
                  Password
                </span>
              </label>
              <input
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                  pattern: {
                    value:
                      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{6,}$/,
                    message:
                      "Must include uppercase, lowercase, number & special character",
                  },
                })}
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                className="input input-bordered"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="btn btn-xs absolute right-4 bottom-[13px]"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
              {errors.password && (
                <span className="text-red-600 text-sm">
                  {errors.password.message}
                </span>
              )}
            </div>

            {/* Register Button */}
            <div className="form-control mt-6">
              <button type="submit" className="btn bg-[#023E8A] text-white">
                Register
              </button>
            </div>
          </form>

          {/* Google Login Placeholder */}
          <div>
            <GoogleUserLogin />
          </div>
        </div>
      </div>
      <div className="col-span-2">{/* <WelcomeBanner /> */}</div>
    </div>
  );
};

export default Register;
