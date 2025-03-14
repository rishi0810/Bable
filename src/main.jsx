import { StrictMode,useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Home from "./Pages/Home.jsx";
import Create from "./Pages/Create.jsx";
import Signup from "./Pages/Signup.jsx";
import Login from "./Pages/Login.jsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Blog from "./Pages/Blog.jsx";

const Root = ()=>{
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="" element={<App />}>
        <Route path="" element={<Home/>} />
        <Route path="blog" element={<Blog/>} />
        <Route path = "create" element={<Create/>}/>
        <Route path = "signup" element={<Signup/>}/>
        <Route path = "login" element={<Login/>}/>
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}


createRoot(document.getElementById("root")).render(
  <StrictMode>
      <Root />
  </StrictMode>
);
