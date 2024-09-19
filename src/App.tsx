import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import Layout from "./layout/Layout";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Ideas from "./pages/Ideas/Ideas";
import ProtectedRoute from "./layout/Protected/Protected";
import CreateIdea from "./pages/CreateIdea/CreateIdea";
import Profile from "./pages/Profile/Profile";
import SingleIdea from "./pages/SingleIdea/SingleIdea";
import Upgrade from "./pages/Upgrade/Upgrade";
import Certificate from "./pages/Certificate/Certificate";
import VerifyMail from "./pages/VerifyMail/VerifyMail";
import NotFound from "./pages/NotFound/NotFound";
import { useEffect } from "react";
import ReactGA from 'react-ga4';
import { useLocation } from "react-router-dom";

function Analytics() {
  const location = useLocation();
  
  useEffect(() => {
    ReactGA.send({ hitType: 'pageview', page: location.pathname });
  }, [location]);
  
  return null;
}

function AnalyticsWrapper() {
  return (
    <>
      <Analytics />
      <Outlet />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <AnalyticsWrapper />,
    children: [
      {
        element: <Layout />,
        children: [
          { index: true, element: <Home /> },
          { path: "register", element: <Register /> },
          { path: "login", element: <Login /> },
          { path: "ideas", element: <Ideas /> },
          {
            path: "create",
            element: (
              <ProtectedRoute>
                <CreateIdea />
              </ProtectedRoute>
            ),
          },
          {
            path: "profile/:userId",
            element: <Profile />,
          },
          {
            path: "ideas/:ideaId",
            element: <SingleIdea />,
          },
          {
            path: "upgrade/:userId",
            element: <Upgrade />,
          },
          {
            path: "ideas/:ideaId/certificate",
            element: <Certificate />,
          },
          {
            path: "verifyemail",
            element: (
              <ProtectedRoute>
                <VerifyMail />
              </ProtectedRoute>
            ),
          },
          { path: "*", element: <NotFound /> },
        ],
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}