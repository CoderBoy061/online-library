import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import "../styles/request.css";
import Footer from "./Footer";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import CircularProgress from "@material-ui/core/CircularProgress";

import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import CancelIcon from "@material-ui/icons/Cancel";
import Snackbar from "@material-ui/core/Snackbar";

function RequestBook() {
  const [request, setRequest] = useState({
    bookname: "",
    author: "",
    publication: "",
    edition: "",
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
  const [dialog, setDialoag] = useState(false);
  const [alert, setAlert] = useState({ showSnackbar: false, message: "" });
  const [successDialouge, setSuccessDialouge] = useState(false);
  const submitRequest = async (e) => {
    e.preventDefault();
    if (request.bookname === "") {
      setAlert({
        showSnackbar: true,
        message: "Please enter a Bookname",
      });
    } else if (request.author === "") {
      setAlert({
        showSnackbar: true,
        message: "Please enter author name",
      });
    } else if (request.publication === "") {
      setAlert({
        showSnackbar: true,
        message: "Please enter publication name",
      });
    } else if (request.edition === "") {
      setAlert({
        showSnackbar: true,
        message: "Please enter Edition number",
      });
    } else {
      setDialoag(true);
      const res = await fetch("/user/request", {
        method: "POST",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      });
      const data = await res.json();
      console.log(data);
      if (res.status === 422 || !data) {
        window.alert("Oops something went wrong");
      } else {
        setDialoag(false);
        setSuccessDialouge(true);
        setRequest({
          bookname: "",
          author: "",
          publication: "",
          edition: "",
        })
      }
    }
  };
  return (
    <div className="request">
      <h2>Please kindly fill the imformation for New Book</h2>
      <form className="request_from">
        <input
          type="text"
          className="book_name"
          placeholder="Enter The Book Name"
          value={request.bookname}
          onChange={(e) => setRequest({ ...request, bookname: e.target.value })}
        />
        <input
          type="text"
          className="book_author"
          placeholder="Enter The name of the Author"
          value={request.author}
          onChange={(e) => setRequest({ ...request, author: e.target.value })}
        />
        <input
          type="text"
          className="book_publication"
          placeholder="Enter The name of the Publication"
          value={request.publication}
          onChange={(e) =>
            setRequest({ ...request, publication: e.target.value })
          }
        />
        <input
          type="text"
          className="book_edition"
          placeholder="Enter The Edition Number"
          value={request.edition}
          onChange={(e) => setRequest({ ...request, edition: e.target.value })}
        />
        <Button
          variant="contained"
          color="secondary"
          id="request_btn"
          onClick={submitRequest}
        >
          Request
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

export default RequestBook;
