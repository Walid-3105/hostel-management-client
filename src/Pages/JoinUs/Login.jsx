import React, { useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";
import useAuth from "../../Hooks/useAuth";
import GoogleUserLogin from "../../Shared/GoogleUserLogin";
import WelcomeBanner from "../../Shared/WelcomeBanner";

const Login = () => {
  const { userLogin } = useAuth();
  const [error, setError] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);

  const handleLogin = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const email = form.get("email");
    const password = form.get("password");

    userLogin(email, password)
      .then((result) => {
        e.target.reset();
        toast.success("Successfully Log In");
        navigate(location?.state ? location.state : "/");
      })
      .catch((err) => {
        setError({ ...error, login: err.code });
        toast.error("Give Correct Password & Email");
      });
  };

  const fillAdminCredentials = () => {
    if (emailInputRef.current && passwordInputRef.current) {
      emailInputRef.current.value = "admin@gmail.com";
      passwordInputRef.current.value = "Wa@123";
    }
  };

  const fillUserCredentials = () => {
    if (emailInputRef.current && passwordInputRef.current) {
      emailInputRef.current.value = "user@gmail.com";
      passwordInputRef.current.value = "Wa@123";
    }
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
            <div className="flex gap-4 mb-4">
              <button
                onClick={fillAdminCredentials}
                className="btn bg-[#023E8A] text-white"
              >
                Log in as Admin
              </button>
              <button
                onClick={fillUserCredentials}
                className="btn bg-[#023E8A] text-white"
              >
                Log in as User
              </button>
            </div>
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
                  ref={emailInputRef}
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
                  ref={passwordInputRef}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="btn btn-xs absolute right-4 bottom-[46px]"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
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
            <div>
              <GoogleUserLogin />
            </div>
          </div>
        </div>
        <div className="col-span-2">
          <WelcomeBanner />
        </div>
      </div>
    </div>
  );
};

export default Login;
