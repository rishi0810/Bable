import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Home from "./Pages/Home.jsx";
import Create from "./Pages/Create.jsx";
import Signup from "./Pages/Signup.jsx";
import Login from "./Pages/Login.jsx";
import Blogs from "./Pages/Blogs.jsx";
import Profile from "./Pages/Profile.jsx";
import About from "./Pages/About.jsx";
import Policy from "./misc/Policy.jsx";
import PrPolicy from "./misc/PrPolicy.jsx";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Blog from "./Pages/Blog.jsx";

const Root = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="" element={<App />}>
        <Route path="" element={<Home />} />
        <Route path="blog/:id" element={<Blog />} />
        <Route path="create" element={<Create />} />
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
        <Route path="blogs" element={<Blogs />} />
        <Route path="profile" element={<Profile />} />
        <Route path="about" element={<About />} />
        <Route path="policy" element={<Policy />} />
        <Route path="prpolicy" element={<PrPolicy />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

createRoot(document.getElementById("root")).render(<Root />);
