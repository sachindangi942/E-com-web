// import React, { useState, useEffect, useCallback } from "react";
// import Container from 'react-bootstrap/Container';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
// import "./headerStyle.css"
// import { Link, useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from "react-redux";
// import { clearToken } from "../../Redux/Fetures/Authslice";
// import { jwtDecode } from "jwt-decode";
// import { hideloading, showloading } from "../../Redux/AlertSclice";
// import { MdAddShoppingCart } from "react-icons/md";
// import { Popconfirm } from "antd";

// function HeaderNav() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const token = useSelector((state) => state.auth.token);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const checkExp = useCallback(() => {
//     const decodeToken = jwtDecode(token);
//     const currentTime = Date.now() / 1000;
//     if (decodeToken > currentTime) {
//       dispatch(clearToken());
//       navigate("/singIn")
//     } else {
//       const remainingTime = (decodeToken.exp - currentTime) * 1000;
//       setTimeout(() => {
//         dispatch(clearToken());
//         navigate("/singIn")

//       }, remainingTime);
//     }
//   }, [token, dispatch, navigate])


//   useEffect(() => {
//     if (token) {
//       setIsAuthenticated(true);
//       checkExp();
//     } else {
//       setIsAuthenticated(false);
//     }
//   }, [token, checkExp]);
//   const handleLogout = () => {
//     dispatch(showloading());
//     dispatch(clearToken());
//     setIsAuthenticated(false);
//     dispatch(hideloading());
//   };

//   return (
//     <Navbar expand="lg" className="mb-4 fs-5 fw-bold">
//       <Container fluid>
//         <Navbar.Toggle aria-controls="basic-navbar-nav" className="ms-auto" />
//         <Navbar.Collapse id="basic-navbar-nav">
//           <Nav className="me-auto">
//             {isAuthenticated ?
//               (<>
//                 <Nav.Link as={Link} to="/" className="text-primary">Home</Nav.Link>
//                 <Nav.Link as={Link} to="/" className="text-primary">Contact us</Nav.Link>
//               </>)
//               : ("")
//             }
//           </Nav>

//           <Nav className="ms-auto">
//             {!isAuthenticated ? (
//               <>
//                 <Nav.Link as={Link} to="/registration" className="text-primary">Registration</Nav.Link>
//                 <Nav.Link as={Link} to="/singIn" className="text-primary">Login</Nav.Link>
//               </>
//             ) : (
//               <>
//                 <Popconfirm
//                   title="Are you sure you want to log out?"
//                   onConfirm={handleLogout}
//                   okText="Yes"
//                   cancelText="No"
//                 >
//                   <Nav.Link as="button" className="text-primary">Logout</Nav.Link>
//                 </Popconfirm>
//                 <Nav.Link as={Link} to="/cartdata" className="d-flex justify-content-center align-items-center w-100 h-50">
//                   <MdAddShoppingCart className="fs-1" />
//                 </Nav.Link>
//               </>

//             )}
//           </Nav>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// }

// export default HeaderNav;



import React, { useState, useEffect, useCallback } from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import "./headerStyle.css";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { clearToken } from "../../Redux/Fetures/Authslice";
import { jwtDecode } from "jwt-decode";
import { hideloading, showloading } from "../../Redux/AlertSclice";
import { MdAddShoppingCart } from "react-icons/md";
import { Popconfirm, Drawer, } from "antd";
import { clearCart } from "../../Redux/Fetures/CartSlice";

function HeaderNav() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const checkExp = useCallback(() => {
    const decodeToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    if (decodeToken > currentTime) {
      dispatch(clearToken());
      navigate("/singIn");
    } else {
      const remainingTime = (decodeToken.exp - currentTime) * 1000;
      setTimeout(() => {
        dispatch(clearToken());
        navigate("/singIn");
      }, remainingTime);
    }
  }, [token, dispatch, navigate]);

  useEffect(() => {
    if (token) {
      setIsAuthenticated(true);
      checkExp();
    } else {
      setIsAuthenticated(false);
    }
  }, [token, checkExp]);

  const handleLogout = () => {
    dispatch(showloading());
    dispatch(clearToken());
    dispatch(clearCart());
    setIsAuthenticated(false);
    dispatch(hideloading());
  };

  const showDrawer = () => {
    setIsDrawerVisible(true);
  };

  const closeDrawer = () => {
    setIsDrawerVisible(false);
  };

  return (
    <Navbar expand="lg" className="mb-4 fs-5 fw-bold">
      <Container fluid>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="ms-auto" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {isAuthenticated ? (
              <>
                <Nav.Link as={Link} to="/" className="text-primary">Home</Nav.Link>
                <Nav.Link as={Link} to="/" className="text-primary">Contact us</Nav.Link>
              </>
            ) : ("")}
          </Nav>

          <Nav className="ms-auto d-flex align-items-center">
            {!isAuthenticated ? (
              <>
                <Nav.Link as={Link} to="/registration" className="text-primary">Registration</Nav.Link>
                <Nav.Link as={Link} to="/singIn" className="text-primary">Login</Nav.Link>
              </>
            ) : (
              <>

                <Nav.Link as={Link} to="/cartdata" className="d-flex justify-content-center align-items-center w-100 h-50">
                  <MdAddShoppingCart className="fs-1" />
                </Nav.Link>
                <div onClick={showDrawer} className="ms-3">Accout</div>

              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
      <Drawer
        title="User Menu"
        placement="right"
        onClose={closeDrawer}
        visible={isDrawerVisible}
      >
        <Nav className="flex-column">
          
          <Nav.Link as={Link} to="/settings" onClick={closeDrawer} className="text-primary">Settings</Nav.Link>
          <Nav.Link as={Link} to="/help" onClick={closeDrawer} className="text-primary">Help</Nav.Link>
          <Nav.Link as={Link} to="/changePassword" onClick={closeDrawer} className="text-primary">Change Password</Nav.Link>
        </Nav>
        <Popconfirm
          title="Are you sure you want to log out?"
          onConfirm={handleLogout}
          okText="Yes"
          cancelText="No"
        >
          <Nav.Link as="button" className="text-primary">Logout</Nav.Link>
        </Popconfirm>
      </Drawer>
    </Navbar>
  );
}

export default HeaderNav;
