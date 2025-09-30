import { Suspense, lazy } from "react";
import App from "./App.jsx";
import LoadingSpinner from "./components/LoadingSpinner.jsx";
import PageSkeleton from "./components/PageSkeleton.jsx";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

const Home = lazy(() => import("./Pages/Home.jsx"));
const Create = lazy(() => import("./Pages/Create.jsx"));
const Signup = lazy(() => import("./Pages/Signup.jsx"));
const Login = lazy(() => import("./Pages/Login.jsx"));
const Blogs = lazy(() => import("./Pages/Blogs.jsx"));
const Profile = lazy(() => import("./Pages/Profile.jsx"));
const About = lazy(() => import("./Pages/About.jsx"));
const Blog = lazy(() => import("./Pages/Blog.jsx"));
const Policy = lazy(() => import("./misc/Policy.jsx"));
const PrPolicy = lazy(() => import("./misc/PrPolicy.jsx"));

const SuspenseWrapper = ({ children, fallback = <LoadingSpinner /> }) => (
  <Suspense fallback={fallback}>{children}</Suspense>
);

const Root = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="" element={<App />}>
        <Route 
          path="" 
          element={
            <SuspenseWrapper fallback={<PageSkeleton type="default" />}>
              <Home />
            </SuspenseWrapper>
          } 
        />
        <Route 
          path="blog/:id" 
          element={
            <SuspenseWrapper fallback={<PageSkeleton type="blog" />}>
              <Blog />
            </SuspenseWrapper>
          } 
        />
        <Route 
          path="create" 
          element={
            <SuspenseWrapper fallback={<PageSkeleton type="form" />}>
              <Create />
            </SuspenseWrapper>
          } 
        />
        <Route 
          path="signup" 
          element={
            <SuspenseWrapper fallback={<PageSkeleton type="form" />}>
              <Signup />
            </SuspenseWrapper>
          } 
        />
        <Route 
          path="login" 
          element={
            <SuspenseWrapper fallback={<PageSkeleton type="form" />}>
              <Login />
            </SuspenseWrapper>
          } 
        />
        <Route 
          path="blogs" 
          element={
            <SuspenseWrapper fallback={<PageSkeleton type="default" />}>
              <Blogs />
            </SuspenseWrapper>
          } 
        />
        <Route 
          path="profile/:userID" 
          element={
            <SuspenseWrapper fallback={<PageSkeleton type="profile" />}>
              <Profile />
            </SuspenseWrapper>
          } 
        />
        <Route 
          path="about" 
          element={
            <SuspenseWrapper fallback={<PageSkeleton type="default" />}>
              <About />
            </SuspenseWrapper>
          } 
        />
        <Route 
          path="policy" 
          element={
            <SuspenseWrapper fallback={<PageSkeleton type="default" />}>
              <Policy />
            </SuspenseWrapper>
          } 
        />
        <Route 
          path="prpolicy" 
          element={
            <SuspenseWrapper fallback={<PageSkeleton type="default" />}>
              <PrPolicy />
            </SuspenseWrapper>
          } 
        />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default Root;