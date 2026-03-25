import { useState } from "react";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isloading, setisloading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setisloading(true);

    try {
      const response = await fetch(
        "https://bable-backend.vercel.app/user/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password,
          }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        console.log("User Registered Successfully:", data);
        toast.success("Signed up successfully", { duration: 1000 });
        setTimeout(() => {
          navigate("/login");
        }, 1200);
      } else {
        console.error("Error:", data.error);
        toast.error(data.error || "Signup failed");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      toast.error("Something went wrong. Please try again.");
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
              Join Us
            </span>
            <div className="h-px w-10 bg-ed-border" />
          </div>
          <h1 className="font-display text-3xl sm:text-4xl text-ed-text tracking-tight">
            Sign Up
          </h1>
          <p className="mt-3 text-sm text-ed-text-secondary font-body">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-ed-accent hover:text-ed-accent-hover underline underline-offset-4 transition-colors duration-200"
            >
              Log in here
            </Link>
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-[11px] tracking-[0.2em] uppercase text-ed-text-secondary font-sans-ui font-medium mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full py-3 px-4 rounded-lg bg-ed-input-bg border border-ed-input-border text-ed-text font-body text-sm focus:outline-none focus:border-ed-accent transition-colors duration-200 placeholder:text-ed-text-tertiary"
              required
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              autoComplete="name"
            />
          </div>

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
              value={formData.email}
              onChange={handleChange}
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
              placeholder="Min. 6 characters"
              value={formData.password}
              minLength={6}
              onChange={handleChange}
              autoComplete="new-password"
            />
          </div>

          <button
            type="submit"
            disabled={isloading}
            className="w-full py-3.5 px-4 rounded-lg text-[13px] tracking-[0.2em] uppercase font-sans-ui font-medium bg-ed-text text-ed-bg hover:opacity-90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {isloading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
}
