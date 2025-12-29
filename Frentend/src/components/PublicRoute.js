// import { useNavigate } from "react-router-dom"

// export const PublicRoute =({children})=>{
//     const navigate = useNavigate();
//     if(localStorage.getItem("token")) return navigate("/");
//     return children;
// }


import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const PublicRoute = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  return children;
};
