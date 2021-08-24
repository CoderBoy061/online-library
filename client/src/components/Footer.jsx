import React from "react";
import logo from "../assests/logo.png";
import "../styles/footer.css";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import InstagramIcon from "@material-ui/icons/Instagram";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import { NavLink } from "react-router-dom";

function Footer() {
  return (
    <div className="footer">
      <img src={logo} alt="Logo" className="footer_logo" />
      <p className="footer_brand">Online Library</p>
      <div className="footer_section">
        <p>Copyright 2021-2022 by Refsnes Data. All Rights Reserved.</p>
        <div className="footer_icons">
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noreferrer"
            style={{ color: " #3b5998" }}
          >
            <FacebookIcon />
          </a>

          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noreferrer"
            style={{ color: "#fb3958" }}
          >
            <InstagramIcon />
          </a>
          <a
            href="https://twitter.com/?lang=en"
            target="_blank"
            rel="noreferrer"
            style={{ color: "#00acee" }}
          >
            <TwitterIcon />
          </a>

          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noreferrer"
            style={{ color: " #0e76a8" }}
          >
            <LinkedInIcon />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
