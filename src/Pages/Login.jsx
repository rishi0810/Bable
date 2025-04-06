import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "react-hot-toast";
const Login = () => {
  const navigate = useNavigate();
  const [formdata, setformdata] = useState({ email: "", password: "" });
  const [isloading, setisloading] = useState(false);
  const [remember, setremember] = useState(false);

  const handlecheck = (e) => {
    setremember(e.target.checked);
  };

  useEffect(() => {
    const existinguser = JSON.parse(localStorage.getItem("user"));
    if (existinguser) {
      setformdata((prv) => ({
        ...prv,
        email: existinguser.email,
        password: existinguser.password,
      }));
    }
  }, []);

  const handlechange = (e) => {
    setformdata((prev_data) => ({
      ...prev_data,
      [e.target.name]: e.target.value,
    }));
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    setisloading(true);
    if (remember) {
      const user = { email: formdata.email, password: formdata.password };
      localStorage.setItem("user", JSON.stringify(user));
    }

    try {
      const response = await fetch("https://bable-backend.vercel.app/user/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formdata),
      });

      if (response.ok) {
        toast.success("Logged in successfully!", {
          duration: 1000,
        });
        setTimeout(() => {
          navigate("/");
          window.location.reload();
        }, 1200);
      } else {
        toast.error("Invalid Credential");
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
      console.error(err);
    } finally {
      setisloading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-zinc-200 via-transparent to-zinc-200 px-4">
      <div className="flex flex-col justify-center items-center space-y-3 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
        <div className="border border-zinc-200 rounded-xl shadow-xl w-full">
          <div className="p-6 sm:p-7 md:p-8 lg:p-10">
            <div className="text-center">
              <h1 className="block text-2xl font-bold text-zinc-800">Log in</h1>
              <p className="mt-2 text-sm text-gray-600">
                Don't have an account yet?
                <Link
                  to={"/signup"}
                  className="text-zinc-600 decoration-2 hover:underline focus:outline-none focus:underline font-medium ml-1"
                >
                  Sign up here
                </Link>
              </p>
            </div>

            <div className="mt-5">
              <form onSubmit={handlesubmit}>
                <div className="grid gap-y-6">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm mb-2 font-semibold"
                    >
                      Email
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="placeholder-zinc-700/60 py-3 px-4 block w-full border border-zinc-300 rounded-lg sm:text-sm focus:ring-2 focus:ring-zinc-500"
                        required
                        placeholder="Email"
                        value={formdata.email}
                        onChange={handlechange}
                        autoComplete="email"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm mb-2 font-semibold"
                    >
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        name="password"
                        id="password"
                        className="placeholder-zinc-700/60 py-3 px-4 block w-full border border-zinc-300 rounded-lg sm:text-sm focus:ring-1 focus:ring-zinc-500"
                        placeholder="Password"
                        value={formdata.password}
                        minLength={6}
                        onChange={handlechange}
                      />
                    </div>
                  </div>

                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      type="checkbox"
                      className="size-4 border-gray-200 text-blue-600 focus:ring-blue-500"
                      checked={remember}
                      onChange={handlecheck}
                    />
                    <label htmlFor="remember-me" className="text-sm ms-2">
                      Remember me
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isloading}
                    className="hover:cursor-pointer w-full py-3 px-4 text-center text-sm font-medium rounded-lg bg-zinc-500 text-white hover:bg-zinc-600 transition-all duration-200 ease-in-out disabled:opacity-50 disabled:pointer-events-none"
                  >
                    {isloading ? "Logging In..." : "Log in"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
