import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./utils/authContext";
import LandingPage from "./pages/landing/landingPage";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import PageNotImplemented from "./pages/pageEmpty";

import CommonHeader from "./Components/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { ProtectedRoute, ProtectedRouteAdmin } from "./utils/protectedRoutes";
import News from "./pages/Newsfeed/News";

const Layout = () => (
  <>
    <CommonHeader />
    <main>
      <Outlet />
    </main>
    <ToastContainer />
  </>
);

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <News /> },
        { path: "/login", element: <LoginPage /> },
        { path: "/register", element: <RegisterPage /> },

        { path: "*", element: <PageNotImplemented /> },
      ],
    },
  ]);

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

export default App;
