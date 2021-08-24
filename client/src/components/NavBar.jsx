import React, { useState, useEffect } from "react";
import logo from "../assests/logo.png";
import "../styles/nav.css";
import { NavLink } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import axios from "axios";
import Tooltip from "@material-ui/core/Tooltip";

function NavBar() {
  // const [user, setuser] = useState({});
  const [show, setShow] = useState(false);
  const [crediential, setCredientials] = useState({});
  const [id, setId] = useState("");

  useEffect(() => {
    getData();
    // axios
    //   .get("user/getdata", {
    //     method: "GET",
    //     headers: {
    //       Accept: "application/json",
    //       "Content-Type": "application/json",
    //     },
    //     credentials: "include",
    //   })
    //   .then((response) => {
    //     // setuser(response.data);
    //     localStorage.setItem(
    //       "user_credientials",
    //       JSON.stringify(response.data)
    //     );
    //     // setId(response.data._id);
    //     // setShow(true);
    //   })
    //   .catch((error) => {
    //     console.log(error.message);
    //   });
  },[]);
  const getData = () => {
    const userdata = JSON.parse(localStorage.getItem("user_credientials"));
    if (userdata) {
      setCredientials(userdata);
      setShow(true);
      setId(userdata._id);
    }
  };
  return (
    <div className="navbar">
      <div className="nav_logo">
        <img src={logo} alt="Logo" className="logo" />
        <p>Online Library</p>
      </div>
      <div className="nav_link">
        <NavLink to="/" style={{ textDecoration: "none", color: "black" }}>
          <p className="nav_links">Home</p>
        </NavLink>
        <NavLink
          to="/contact"
          style={{ textDecoration: "none", color: "black" }}
        >
          <p className="nav_links">Contact Us</p>
        </NavLink>
        <Tooltip title="Request for new book" aria-label="NavBar">
          <NavLink
            to="/request"
            style={{ textDecoration: "none", color: "black" }}
          >
            <p className="nav_links">Request Book</p>
          </NavLink>
        </Tooltip>
        <NavLink to="/about" style={{ textDecoration: "none", color: "black" }}>
          <p className="nav_links">About</p>
        </NavLink>
        {show ? (
          <>
            <Tooltip title="your wishlist" aria-label="NavBar">
              <NavLink
                to={`/wishlist/${id}`}
                style={{ textDecoration: "none", color: "black" }}
              >
                <p className="nav_links">Wish List</p>
              </NavLink>
            </Tooltip>
            <div className="user">
              <Tooltip title="Profile" aria-label="NavBar">
                <NavLink
                  to={`/profile/${id}`}
                  style={{ textDecoration: "none" }}
                >
                  <Avatar src={crediential.image} alt={crediential.username} />
                </NavLink>
              </Tooltip>
            </div>
          </>
        ) : (
          // </div>
          <>
            <NavLink
              to="/login"
              style={{ textDecoration: "none", color: "black" }}
            >
              <p className="nav_links">Login</p>
            </NavLink>
            <NavLink
              to="/signup"
              style={{ textDecoration: "none", color: "black" }}
            >
              <p className="nav_links">Signup</p>
            </NavLink>
          </>
        )}
        {/* <NavLink to="/about" style={{ textDecoration: "none", color: "black" }}>
          <p className="nav_links">About</p>
        </NavLink> */}
        {/* <NavLink to="/login" style={{ textDecoration: "none",color:"black" }}>
          <p className="nav_links">Login</p>
        </NavLink>
        <NavLink to="/signup" style={{ textDecoration: "none",color:"black" }}>
          <p className="nav_links">Signup</p>
        </NavLink> */}
        {/* <NavLink
          to="/contact"
          style={{ textDecoration: "none", color: "black" }}
        >
          <p className="nav_links">Contact Us</p>
        </NavLink>
        <NavLink
          to="/request"
          style={{ textDecoration: "none", color: "black" }}
        >
          <p className="nav_links">Request Book</p>
        </NavLink> */}
        {/* <NavLink to="/wishlist" style={{ textDecoration: "none",color:"black" }}>
          <p className="nav_links">Wish List</p>
        </NavLink>
        <NavLink to="/logout" style={{ textDecoration: "none",color:"black" }}>
          <p className="nav_links">Logout</p>
        </NavLink>
        <div className="user">
          <Avatar />
        </div> */}
      </div>
    </div>
  );
}

export default NavBar;
