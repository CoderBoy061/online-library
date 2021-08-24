import React, { useState } from "react";
import "../styles/contact.css";
import Button from "@material-ui/core/Button";
import Footer from "./Footer";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import CircularProgress from "@material-ui/core/CircularProgress";
// import axios from "axios";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import CancelIcon from "@material-ui/icons/Cancel";
import Snackbar from "@material-ui/core/Snackbar";
// import {CONTACTAPI} from "../api/api";
function Contact() {
  const [dialog, setDialoag] = useState(false);
  const [contactData, setContactdata] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    district: "",
    message: "",
  });
  const [alert, setAlert] = useState({ showSnackbar: false, message: "" });
  const [successDialouge, setSuccessDialouge] = useState(false);
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
  const submitContact = async (e) => {
    e.preventDefault();
    if (contactData.name === "") {
      setAlert({
        showSnackbar: true,
        message: "Please enter your name",
      });
    } else if (contactData.email === "") {
      setAlert({
        showSnackbar: true,
        message: "Please enter your email",
      });
    } else if (contactData.phone === "") {
      setAlert({
        showSnackbar: true,
        message: "Please enter your phone number",
      });
    } else if (contactData.district === "") {
      setAlert({
        showSnackbar: true,
        message: "Please enter your district",
      });
    } else if (contactData.message === "") {
      setAlert({
        showSnackbar: true,
        message: "Please enter your message",
      });
    } else {
      setDialoag(true);
      const res = await fetch("/user/contact", {
        method: "POST",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contactData),
      });
      const data = await res.json();
      // console.log(data);
      if (res.status === 422 || !data) {
        window.alert("Oops something went wrong");
      } else {
        setDialoag(false);
        setSuccessDialouge(true);
        setContactdata({
          name: "",
          email: "",
          phone: "",
          address: "",
          district: "",
          message: "",
        });
      }
    }
  };
  return (
    <div className="contact">
      <h2>Feel free to reach us</h2>
      <form className="contact_from">
        <input
          type="text"
          className="name"
          placeholder="Enter your name"
          value={contactData.name}
          onChange={(e) =>
            setContactdata({ ...contactData, name: e.target.value })
          }
        />
        <input
          type="email"
          className="email"
          placeholder="Enter your email"
          value={contactData.email}
          onChange={(e) =>
            setContactdata({ ...contactData, email: e.target.value })
          }
        />
        <input
          type="phone"
          className="phone"
          placeholder="Enter your phone "
          value={contactData.phone}
          onChange={(e) =>
            setContactdata({ ...contactData, phone: e.target.value })
          }
        />
        <input
          type="text"
          className="address"
          placeholder="Enter your Address "
          value={contactData.address}
          onChange={(e) =>
            setContactdata({ ...contactData, address: e.target.value })
          }
        />
        <input
          type="text"
          className="dist"
          placeholder="Enter your District "
          value={contactData.district}
          onChange={(e) =>
            setContactdata({ ...contactData, district: e.target.value })
          }
        />
        <textarea
          className="message"
          placeholder="Type your Message "
          value={contactData.message}
          onChange={(e) =>
            setContactdata({ ...contactData, message: e.target.value })
          }
        />
        <Button
          variant="contained"
          color="secondary"
          id="submit_btn"
          onClick={submitContact}
        >
          Submit
        </Button>
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
              Request sent Successfylly
              <br />
              We will get back to you shortly
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

export default Contact;
