import React, { useState, useEffect } from "react";
import "../styles/Home.css";
import li1 from "../assests/li1.png";
import li2 from "../assests/li2.png";
import li6 from "../assests/li6.jpg";
import Footer from "./Footer";
import library from "../assests/library.jpg";
import { NavLink } from "react-router-dom";
// import axios from "axios";

function Home() {
  const [show, setShow] = useState(false);
  const [uid, setUid] = useState("");
  useEffect(() => {
    getData();
  }, [show]);
  const getData = () => {
    const userdata = JSON.parse(localStorage.getItem("user_credientials"));
    if (userdata) {
      setShow(true);
      setUid(userdata._id);
    }
  };
  return (
    <div className="home">
      <div className="first_section">
        <img src={li1} alt="Library" className="first_img" />
        <div className="first_para">
          <h2>Why online Library is the Best ?</h2>
          <p>
            Online libraries help the scientific society since they act as a
            reservoir for the storage of important research data, information
            and findings. For a very long time, the physical records of
            scientific studies and researches had to live with a critical issue:
            they were destroyed or lost.
          </p>
          <NavLink to={show ? "/library/" + uid : "/login"}>
            <button className="explore">Explore Now</button>
          </NavLink>
        </div>
      </div>
      <div className="second_section">
        <div className="second_para">
          <h2>Why we should use Online Library</h2>
          <p>
            Now days everything is oneline . Beign online is very easier to
            search and select the desire book for anyone who wants to read book
            . Book is our main priority when we are in collges,schools . Book
            helps us to grow our knowledge , gives us practical knowledge{" "}
          </p>
          <NavLink to={show ? "/library/" + uid : "/login"}>
            <button className="access">Access Books</button>
          </NavLink>
        </div>
        <img src={li2} alt="Library" className="second_img" />
      </div>
      <div className="third_section">
        <img src={li6} alt="Library" className="third_img" />
        <h2>Search your Favourite Books</h2>
        <p>
          Online Library Management is a fast and secure books searching website
          . It brings you the whole Book world at front of you without going
          anywhere. This pandemic situation The Online Library Management System
          is best fro you.
        </p>
        <NavLink to={show ? "/library/" + uid : "/login"}>
          <button className="seacrh">Search Books</button>
        </NavLink>
      </div>
      <div className="fourth_section">
        <img src={library} alt="Library" className="fourth_img" />
        <div className="fourth_para">
          <h2>Collect your Books now </h2>
          <p>
            Online Library is the one of the best Library on the Internet
            nowdays . To collect your Books , go Signup and create your new
            account now and access early
          </p>
          <NavLink to={show ? "/library/" + uid : "/signup"}>
            <button className="signup_btn">Signup</button>
          </NavLink>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
