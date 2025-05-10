// Layout.js
import { useLocation } from "react-router-dom";
import CartHeader from "./MyNavbars/CartHeader";
import HeaderNav from "./MyNavbars/HeaderNav";

const Layout = ({ children }) => {
  const location = useLocation();
  const showCartHeader = location.pathname === "/cartdata";

  return (
    <>
      {showCartHeader ? <CartHeader/> : <HeaderNav/>}
      {children}
    </>
  );
};

export default Layout;
