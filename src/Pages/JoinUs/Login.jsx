import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";
import useAuth from "../../Hooks/useAuth";
import GoogleUserLogin from "../../Shared/GoogleUserLogin";
import WelcomeBanner from "../../Shared/WelcomeBanner";

const Login = () => {
  const { userLogin, signInWithGoogle } = useAuth();
  const [error, setError] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const email = form.get("email");
    const password = form.get("password");

    userLogin(email, password)
      .then((result) => {
        e.target.reset();
        // console.log(result);
        toast.success("Successfully Log In");
        navigate(location?.state ? location.state : "/");
      })
      .catch((err) => {
        setError({ ...error, login: err.code });
        toast.error("Give Correct Password & Email");
      });
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 overflow-hidden">
        <div className="w-full flex justify-center items-center">
          <div className="card w-full md:max-w-[380px] lg:max-w-[440px] p-10 mt-6">
            <div className=" font-semibold mb-4">
              <Link to="/" className="flex gap-2 text-center items-center">
                <FaArrowLeft />
                Home
              </Link>
            </div>
            <h2 className="text-2xl font-bold text-left">Log In</h2>
            <p className="text-left font-semibold mb-2">
              Do not have a Account ?
              <Link to="/register" className="text-[#023E8A] pl-1">
                Register
              </Link>
            </p>
            <form onSubmit={handleLogin} className="pb-3">
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-gray-700 font-semibold">
                    Email
                  </span>
                </label>
                <input
                  name="email"
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control relative ">
                <label className="label">
                  <span className="label-text text-gray-700 font-semibold">
                    Password
                  </span>
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="password"
                  className="input input-bordered"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="btn btn-xs absolute right-4 bottom-[46px]"
                >
                  {showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}
                </button>

                <label className="label text-gray-700 font-semibold">
                  <Link
                    to="/auth/forgetPassword"
                    className="label-text-alt link link-hover"
                  >
                    Forgot password?
                  </Link>
                </label>
              </div>
              {error.login && (
                <label className="label text-red-600">{error.login}</label>
              )}
              <div className="form-control mt-6">
                <button className="btn bg-[#023E8A] text-white">Login</button>
              </div>
            </form>
            {/* Goggle */}
            <div>
              <GoogleUserLogin />
            </div>
          </div>
        </div>
        <div className="col-span-2">
          <WelcomeBanner></WelcomeBanner>
        </div>
      </div>
    </div>
  );
};

export default Login;
