import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import "../styles/profile.css";
// import logo from "../assests/logo.png";
import axios from "axios";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import CircularProgress from "@material-ui/core/CircularProgress";

function Profile() {
  const [user, setUser] = useState({});
  const [dialog, setDialoag] = useState(false);
  const { id } = useParams();
  const logoutUser = () => {
    setDialoag(true);
    axios
      .get("/user/logout")
      .then((response) => {
        console.log(response);
        localStorage.removeItem("user_credientials");
        window.location.replace("/login");
        setDialoag(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const closeDialog = () => {
    setDialoag(false);
  };
  useEffect(() => {
    axios
      .get(`/user/getUser/${id}`)
      .then((res) => {
        console.log(res.data);
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="profile">
      <img src={user.image} alt={user.username} className="user_image" />
      <div className="user_data">
        <p>Username : {user.username}</p>
        <p>Name : {user.fullname}</p>
        <p>Email : {user.email}</p>
        <p>Phone number : {user.phone}</p>
        <Tooltip title="want to logout?" aria-label="Profile">
          <Button variant="contained" color="secondary" onClick={logoutUser}>
            Logout
          </Button>
        </Tooltip>
      </div>
      <Dialog open={dialog} onClose={closeDialog}>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <CircularProgress color="secondary" size="3rem" />
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Profile;
