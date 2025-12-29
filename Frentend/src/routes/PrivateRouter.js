// import { Outlet, Navigate } from "react-router-dom";

// export const PrivateRoute = () => {
//   const token = localStorage.getItem("token");

//   return token ? <Outlet /> : <Navigate to="/singIn" replace />;
// };



import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export const PrivateRoute = () => {
  const token = useSelector(state => state.auth.token);
  const parsedToken = token ? JSON.parse(token) : null;

  return parsedToken ? <Outlet /> : <Navigate to="/singIn" replace />;
};
