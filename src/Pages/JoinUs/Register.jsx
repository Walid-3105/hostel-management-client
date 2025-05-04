import React, { useState } from "react";
import { FaArrowLeft, FaEye, FaEyeSlash, FaImage } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAuth from "../../Hooks/useAuth";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import GoogleUserLogin from "../../Shared/GoogleUserLogin";
import WelcomeBanner from "../../Shared/WelcomeBanner";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const Register = () => {
  const { createUser, updateUserProfile } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // Handle image selection for preview and validation
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type and size
      const validTypes = ["image/jpeg", "image/png"];
      if (!validTypes.includes(file.type)) {
        toast.error("Please upload a JPEG or PNG image");
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        // 2MB limit
        toast.error("Image size must be less than 2MB");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
  };

  const onSubmit = async (data) => {
    setIsLoading(true); // Start loading
    const { name, email, password } = data;
    try {
      // Image upload to ImgBB
      const imageFile = { image: data.image[0] };
      const res = await axiosPublic.post(image_hosting_api, imageFile, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });

      // Check if image upload was successful
      if (!res.data.success || !res.data.data.url) {
        throw new Error("Image upload failed");
      }

      const photoURL = res.data.data.url;

      // Create user with email and password
      await createUser(email, password);

      // Update user profile with name and photoURL
      await updateUserProfile({ displayName: name, photoURL });

      // Save user info to your backend
      const userInfo = {
        name,
        email,
        badge: "Bronze",
      };
      await axiosPublic.post("/users", userInfo);

      reset();
      setPreviewImage(null); // Clear preview
      toast.success("User created successfully!");
      navigate(location?.state ? location.state : "/");
    } catch (error) {
      console.error("Registration error:", error);
      toast.error(
        error.message.includes("auth/email-already-in-use")
          ? "Email already in use"
          : "Registration failed. Please try again."
      );
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 overflow-hidden">
      <div className="w-full flex justify-center items-center">
        <div className="card w-full md:max-w-[380px] lg:max-w-[440px] p-10 pb-0 mt-6">
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
                  Profile Image
                </span>
              </label>
              <div className="flex items-center">
                {previewImage ? (
                  <div className="mr-2">
                    <img
                      src={previewImage}
                      alt="Selected profile preview"
                      className="w-10 h-10 object-cover rounded-full border border-gray-300"
                    />
                  </div>
                ) : (
                  <p className="text-2xl rounded-full bg-gray-200 p-2 text-gray-600 mr-2 items-center">
                    <FaImage />
                  </p>
                )}

                <input
                  type="file"
                  {...register("image", { required: true })}
                  onChange={handleImageChange}
                  className="file-input file-input-ghost border-gray-100"
                />
              </div>
              {errors.image && (
                <span className="text-red-500">Image is required</span>
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

            {/* Register */}
            <div className="form-control mt-6 p-10">
              <button
                type="submit"
                className="btn bg-[#023E8A] text-white"
                disabled={isLoading}
              >
                {isLoading ? "Registering..." : "Register"}
              </button>
            </div>
          </form>

          <div>
            <GoogleUserLogin />
          </div>
        </div>
      </div>
      <div className="col-span-2">
        <WelcomeBanner />
      </div>
    </div>
  );
};

export default Register;
