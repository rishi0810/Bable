import { useState } from "react";
import { useNavigate } from "react-router";
export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/user/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Logged in");
        navigate("/");
        window.location.reload();
      } else {
        console.error("Error:", data.error);
      }
    } catch (error) {
      console.error("Error loggin in:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4 font-poppins">
      <div className="p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-zinc-950 text-center">
          Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="enter email...."
            className="w-full p-2 border rounded-sm"
            required
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="enter password...."
            className="w-full p-2 border rounded-sm"
            required
            minLength={6}
          />
          <button
            type="submit"
            className="w-full bg-zinc-900 text-white p-2 rounded-sm cursor-pointer hover:bg-zinc-700"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
