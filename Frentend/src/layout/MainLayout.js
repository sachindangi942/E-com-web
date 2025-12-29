import { Outlet } from "react-router-dom";
import HeaderNav from "../components/MyNavbars/HeaderNav";

const MainLayout = () => {
  return (
    <>
      <HeaderNav/>
        <Outlet />
    </>
  );
};

export default MainLayout;
