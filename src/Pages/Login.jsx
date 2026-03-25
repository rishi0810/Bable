import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "react-hot-toast";
import { useAuth } from "../hooks/useAuth.js";

const Login = () => {
  const navigate = useNavigate();
  const [formdata, setformdata] = useState({ email: "", password: "" });
  const [isloading, setisloading] = useState(false);
  const [remember, setremember] = useState(false);
  const { login } = useAuth();

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
      const authenticated = await login(formdata);

      if (!authenticated) {
        toast.error("Invalid credentials");
        return;
      }

      toast.success("Logged in successfully!", {
        duration: 1000,
      });
      setTimeout(() => {
        navigate("/");
      }, 1200);
    } catch (error) {
      toast.error(error.message || "Invalid credentials");
    } finally {
      setisloading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-5 py-16">
      <div className="w-full max-w-sm">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-10 bg-ed-border" />
            <span className="text-[11px] tracking-[0.3em] uppercase text-ed-text-tertiary font-sans-ui">
              Welcome Back
            </span>
            <div className="h-px w-10 bg-ed-border" />
          </div>
          <h1 className="font-display text-3xl sm:text-4xl text-ed-text tracking-tight">
            Log In
          </h1>
          <p className="mt-3 text-sm text-ed-text-secondary font-body">
            Don&apos;t have an account?{" "}
            <Link
              to="/signup"
              className="text-ed-accent hover:text-ed-accent-hover underline underline-offset-4 transition-colors duration-200"
            >
              Sign up here
            </Link>
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handlesubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-[11px] tracking-[0.2em] uppercase text-ed-text-secondary font-sans-ui font-medium mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full py-3 px-4 rounded-lg bg-ed-input-bg border border-ed-input-border text-ed-text font-body text-sm focus:outline-none focus:border-ed-accent transition-colors duration-200 placeholder:text-ed-text-tertiary"
              required
              placeholder="your@email.com"
              value={formdata.email}
              onChange={handlechange}
              autoComplete="email"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-[11px] tracking-[0.2em] uppercase text-ed-text-secondary font-sans-ui font-medium mb-2"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="w-full py-3 px-4 rounded-lg bg-ed-input-bg border border-ed-input-border text-ed-text font-body text-sm focus:outline-none focus:border-ed-accent transition-colors duration-200 placeholder:text-ed-text-tertiary"
              placeholder="Enter your password"
              value={formdata.password}
              minLength={6}
              onChange={handlechange}
            />
          </div>

          <div className="flex items-center gap-2.5">
            <input
              id="remember-me"
              type="checkbox"
              className="size-4 accent-ed-accent border-ed-input-border"
              checked={remember}
              onChange={handlecheck}
            />
            <label
              htmlFor="remember-me"
              className="text-sm text-ed-text-secondary font-body"
            >
              Remember me
            </label>
          </div>

          <button
            type="submit"
            disabled={isloading}
            className="w-full py-3.5 px-4 rounded-lg text-[13px] tracking-[0.2em] uppercase font-sans-ui font-medium bg-ed-text text-ed-bg hover:opacity-90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {isloading ? "Signing In..." : "Log In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
