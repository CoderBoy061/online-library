import React, { useEffect, useState } from "react";
import "../styles/wishlist.css";
import DeleteIcon from "@material-ui/icons/Delete";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import { NavLink, useParams } from "react-router-dom";
import Footer from "./Footer";
import Snackbar from "@material-ui/core/Snackbar";
import { db } from "../firebase";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

function WishList() {
  const { id } = useParams();
  const [wishId, setWishId] = useState("");
  const [info, setInfo] = useState([]);
  const [info_id, setInfo_id] = useState("");
  const [show, setShow] = useState(false);
  const [alert, setAlert] = useState({ showSnackbar: false, message: "" });
  useEffect(() => {
    wishlists();
  }, []);
  const wishlists = async () => {
    const reference = db.collection("wishlist");
    const snapshop = await reference.where("user_id", "==", id).get();
    if (snapshop.empty) {
      setAlert({
        showSnackbar: true,
        message: "No Books found",
      });
    }
    snapshop.forEach((doc) => {
      var data = doc.data();
      setInfo_id(doc.user_id);
      setInfo((arr) => [...arr, data]);
      setWishId(info.wish_id);
      setShow(true);
    });
  };

  const deleteWishList = async () => {
    var deleteDoc = db.collection("wishlist").where("user_id", "==", id);
    deleteDoc.get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        doc.ref
          .delete()
          .then(() => {
            setAlert({
              showSnackbar: true,
              message: "Item deleted successfully",
            });
            window.location.replace("/wishlist/" + id);
          })
          .catch(() => {
            setAlert({
              showSnackbar: true,
              message: "Oops ! somehting wrong",
            });
          });
      });
    });
  };
  // let fs = firebase.firestore();
  // let collectionRef = fs.collection(<your collection here>);

  {
    /* collectionRef.where("name", "==", name)
.get()
.then(querySnapshot => {
  querySnapshot.forEach((doc) => {
    doc.ref.delete().then(() => {
      console.log("Document successfully deleted!");
    }).catch(function(error) {
      console.error("Error removing document: ", error);
    });
  });
})
.catch(function(error) {
  console.log("Error getting documents: ", error);
}); */
  }

  const closeSnack = () => {
    setAlert({
      showSnackbar: false,
    });
  };
  const wishlistBooks = () => {
    return info.map((data) => (
      <div className="books_box" key={info_id}>
        <img src={data.image} alt="Book" className="book_img" />
        <h3>
          Title<span>{data.title}</span>
        </h3>
        <h5>
          Author <span>{data.author}</span>
        </h5>
        <div className="icons_wish">
          <Tooltip title="delete" aria-label="Wish list">
            <DeleteIcon
              style={{ color: "red", fontSize: "2rem" }}
              onClick={() => deleteWishList()}
            />
          </Tooltip>
          <NavLink to={`/library/${id}`} style={{ textDecoration: "none" }}>
            <Tooltip title="back to previous" aria-label="SearchBooks">
              <ArrowBackIcon style={{ fontSize: "2rem", color: "black" }} />
            </Tooltip>
          </NavLink>
        </div>
      </div>
    ));
  };

  return (
    <>
      <div className="books_added">
        {show ? (
          wishlistBooks()
        ) : (
          <div className="main">
            <p>
              You have no Books in Wish list.Please add books to the wishlist
            </p>
            <NavLink to={`/library/${id}`} style={{ textDecoration: "none" }}>
              <Tooltip title="back to previous page" aria-label="Wish list">
                <Button variant="contained" color="primary">
                  Previous
                </Button>
              </Tooltip>
            </NavLink>
          </div>
        )}
      </div>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        open={alert.showSnackbar}
        message={alert.message}
        autoHideDuration={3000}
        onClose={closeSnack}
      />
      <Footer />
    </>
  );
}

export default WishList;
