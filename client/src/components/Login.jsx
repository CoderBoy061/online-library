import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import "../styles/login.css";
import { NavLink } from "react-router-dom";
import Footer from "./Footer";
import Snackbar from "@material-ui/core/Snackbar";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import CircularProgress from "@material-ui/core/CircularProgress";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import CancelIcon from "@material-ui/icons/Cancel";

function Login() {
  const [alert, setAlert] = useState({ showSnackbar: false, message: "" });
  const [dialog, setDialoag] = useState(false);
  const [successDialouge, setSuccessDialouge] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
  const loginData = async (e) => {
    e.preventDefault();
    if (email === "") {
      setAlert({
        showSnackbar: true,
        message: "Please enter your email",
      });
    } else if (password === "") {
      setAlert({
        showSnackbar: true,
        message: "Please enter your password",
      });
    } else {
      setDialoag(true);
      const res = await fetch("/user/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.status === 422 || !data) {
        window.alert("Failed to register");
      } else {
        setDialoag(false);
        if (data.email !== email) {
          setAlert({
            showSnackbar: true,
            message: "Invalid credientials",
          });
        } else {
          setSuccessDialouge(true);
          setEmail("");
          setPassword("");
          window.location.replace("/");
        }
      }
    }
  };
  return (
    <div className="login">
      <h2>Please login to use Library</h2>
      <form className="login_form">
        <input
          type="email"
          className="login_email"
          placeholder="Enter a Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="login_pass"
          placeholder="Enter a Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className="hint">password must be 8 character</p>
        <Button
          variant="contained"
          color="secondary"
          id="login_btn"
          onClick={loginData}
        >
          Login
        </Button>
        <NavLink to="/signup" style={{ textDecoration: "none" }}>
          <p className="dont_account">Don't Have an Account ?</p>
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
              Login user Successfully
              <br />
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

export default Login;
