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
      const response = await fetch("https://bable-backend.vercel.app/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

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
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4">
      <div className="flex flex-col justify-center items-center space-y-3 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
        <div className="border border-zinc-200 rounded-xl shadow-xl w-full">
          <div className="p-6 sm:p-7 md:p-8 lg:p-10">
            <div className="text-center">
              <h1 className="block text-2xl font-bold text-zinc-800">Sign up</h1>
              <p className="mt-2 text-sm text-gray-600">
                Already have an account?
                <Link
                  to={"/login"}
                  className="text-blue-600 decoration-2 hover:underline focus:outline-none focus:underline font-medium ml-1 underline"
                >
                  Log in here
                </Link>
              </p>
            </div>

            <div className="mt-5">
              <form onSubmit={handleSubmit}>
                <div className="grid gap-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm mb-2 font-semibold"
                    >
                      Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="placeholder-zinc-700/60 py-3 px-4 block w-full border border-zinc-300 rounded-lg sm:text-sm focus:ring-2 focus:ring-zinc-500"
                        required
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={handleChange}
                        autoComplete="name"
                      />
                    </div>
                  </div>

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
                        value={formData.email}
                        onChange={handleChange}
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
                        value={formData.password}
                        minLength={6}
                        onChange={handleChange}
                        autoComplete="new-password"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isloading}
                    className="hover:cursor-pointer w-full py-3 px-4 text-center text-sm font-medium rounded-lg bg-zinc-500 text-white hover:bg-zinc-600 transition-all duration-200 ease-in-out disabled:opacity-50 disabled:pointer-events-none"
                  >
                    {isloading ? "Signing up..." : "Sign up"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
