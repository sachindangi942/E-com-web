// import { Outlet, Navigate } from "react-router-dom";

// export const PublicRoute = () => {
//   const token = localStorage.getItem("token");

//   return !token ? <Outlet /> : <Navigate to="/" replace />;
// };


import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export const PublicRoute = () => {
  const token = useSelector(state => state.auth.token);
  const parsedToken = token ? JSON.parse(token) : null;

  return parsedToken ? <Navigate to="/" replace /> : <Outlet />;
};
