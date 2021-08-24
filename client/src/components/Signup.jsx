import React, { useState } from "react";
import FileBase64 from "react-file-base64";
import "../styles/signup.css";
import Button from "@material-ui/core/Button";
import Footer from "./Footer";
import { NavLink } from "react-router-dom";
import Snackbar from "@material-ui/core/Snackbar";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import CircularProgress from "@material-ui/core/CircularProgress";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import CancelIcon from "@material-ui/icons/Cancel";
import { SIGNUPAPI } from "../api/api";

function Signup() {
  const [alert, setAlert] = useState({ showSnackbar: false, message: "" });
  const [dialog, setDialoag] = useState(false);
  const [successDialouge, setSuccessDialouge] = useState(false);
  const [userData, setUserdata] = useState({
    username: "",
    fullname: "",
    email: "",
    phone: "",
    password: "",
    cpassword: "",
    image: "",
  });
  const closeDialog = () => {
    setDialoag(false);
  };
  const closeSuccessDialouge = () => {
    setSuccessDialouge(false);
  };
  const closeSnack = () => {
    setAlert({
      showSnackbar: false,
    });
  };
  const submitSignup = async (e) => {
    e.preventDefault();
    if (userData.username === "") {
      setAlert({
        showSnackbar: true,
        message: "Please enter a username",
      });
    } else if (userData.fullname === "") {
      setAlert({
        showSnackbar: true,
        message: "Please enter your fullname",
      });
    } else if (userData.email === "") {
      setAlert({
        showSnackbar: true,
        message: "Please enter your email",
      });
    } else if (userData.phone === "") {
      setAlert({
        showSnackbar: true,
        message: "Please enter your phone number",
      });
    } else if (userData.password === "") {
      setAlert({
        showSnackbar: true,
        message: "Please enter password",
      });
    } else if (userData.cpassword === "") {
      setAlert({
        showSnackbar: true,
        message: "Please enter your fullname",
      });
    } else if (userData.password !== userData.cpassword) {
      setAlert({
        showSnackbar: true,
        message: "password not matching",
      });
    } else if (userData.image === "") {
      setAlert({
        showSnackbar: true,
        message: "Please select a image",
      });
    } else {
      setDialoag(true);
      const res = await fetch(SIGNUPAPI, {
        method: "POST",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      const data = await res.json();
      if (res.status === 422 || !data) {
        window.alert("Failed to register");
      } else {
        setDialoag(false);
        if (data.email !== userData.email) {
          setAlert({
            showSnackbar: true,
            message: "Email is already registered",
          });
        } else {
          setSuccessDialouge(true);
          window.location.replace("/login");
        }
      }
    }
  };
  return (
    <div className="signup">
      <h2>Fillup the form to Create an Account</h2>
      <form className="signup_form">
        <input
          type="text"
          className="username"
          placeholder="Enter a username"
          value={userData.username}
          onChange={(e) =>
            setUserdata({ ...userData, username: e.target.value })
          }
        />
        <input
          type="text"
          className="fullname"
          placeholder="Enter your Fullname"
          value={userData.fullname}
          onChange={(e) =>
            setUserdata({ ...userData, fullname: e.target.value })
          }
        />
        <input
          type="email"
          className="user_email"
          placeholder="Enter your Email"
          value={userData.email}
          onChange={(e) => setUserdata({ ...userData, email: e.target.value })}
        />

        <input
          type="text"
          className="user_phone"
          placeholder="Enter your Phone number"
          value={userData.phone}
          onChange={(e) => setUserdata({ ...userData, phone: e.target.value })}
        />
        <input
          type="password"
          className="user_password"
          placeholder="Choose a password"
          value={userData.password}
          onChange={(e) =>
            setUserdata({ ...userData, password: e.target.value })
          }
        />
        <p className="hint">password must be 8 character</p>
        <input
          type="password"
          className="user_cpassword"
          placeholder="Confirm your password"
          value={userData.cpassword}
          onChange={(e) =>
            setUserdata({ ...userData, cpassword: e.target.value })
          }
        />
        <div className="user_pic">
          <FileBase64
            type="file"
            value={userData.image}
            onDone={({ base64 }) => setUserdata({ ...userData, image: base64 })}
          />
        </div>
        <Button
          variant="contained"
          color="secondary"
          id="signup_btn"
          onClick={submitSignup}
        >
          SignUp
        </Button>
        <NavLink to="/login" style={{ textDecoration: "none" }}>
          <p className="already_account">Already Have an Account ?</p>
        </NavLink>
      </form>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        open={alert.showSnackbar}
        message={alert.message}
        autoHideDuration={3000}
        onClose={closeSnack}
      />
      <Dialog open={dialog} onClose={closeDialog}>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <CircularProgress color="secondary" />
            <p style={{ fontFamily: "cursive", color: "blue" }}>Wait..</p>
          </DialogContentText>
        </DialogContent>
      </Dialog>
      <Dialog open={successDialouge}>
        <DialogContent color="black">
          <DialogContentText id="alert-dialog-description">
            <CancelIcon
              style={{
                marginLeft: "12vw",
                fontSize: "1.8rem",
                marginBottom: "1vh",
              }}
              onClick={closeSuccessDialouge}
            />

            <p
              style={{
                fontFamily: "cursive",
                color: "blue",
                fontSize: "1.1rem",
              }}
            >
              User Registered Successfully
              <br />
              You can log in now
            </p>
            <CheckCircleOutlineIcon
              style={{
                fontSize: "3rem",
                color: "blue",
                marginLeft: "5.5vw",
                marginTop: "1.5vh",
              }}
            />
          </DialogContentText>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}

export default Signup;
