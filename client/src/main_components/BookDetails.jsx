import React, { useEffect, useState } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Footer from "../components/Footer";
import { useParams, NavLink } from "react-router-dom";
import axios from "axios";
import "./styles/bookdetail.css";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import BookIcon from "@material-ui/icons/Book";
// import FavoriteIcon from "@material-ui/icons/Favorite";
import Tooltip from "@material-ui/core/Tooltip";
import Snackbar from "@material-ui/core/Snackbar";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { db } from "../firebase";

function BookDetails() {
  const { id, uid } = useParams();
  const apiKey = "AIzaSyBJe4Z5KP2Hhg5s_vFDCbe8stRDNCeUoE4";
  const [book, setBook] = useState({});
  const [bookimg, setBookimg] = useState("");
  const [wishlist, setWishlist] = useState({});
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ showSnackbar: false, message: "" });
  const closeSnack = () => {
    setAlert({
      showSnackbar: false,
    });
  };
  const addtoWishlist = () => {
    db.collection("wishlist")
      .add({
        user_id: uid,
        wish_id: wishlist.id,
        title: wishlist.volumeInfo.title,
        author: wishlist.volumeInfo.authors,
        image: wishlist.volumeInfo.imageLinks.thumbnail,
      })
      .then((res) => {
        setAlert({
          showSnackbar: true,
          message: "Item added successfully",
        });
      });
  };
  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://www.googleapis.com/books/v1/volumes/${id}?key=${apiKey}`)
      .then((response) => {
        setBook(response.data.volumeInfo);
        setBookimg(response.data.volumeInfo.imageLinks);
        setWishlist(response.data);

        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  if (loading) {
    return (
      <CircularProgress
        color="secondary"
        size="5rem"
        style={{ marginTop: "20vh", marginLeft: "48vw" }}
      />
    );
  } else {
    return (
      <>
        <div className="book_details">
          <div className="book_details_desc" key={book.id}>
            <p>Publisher : {book.publisher}</p>
            <p>Published Date : {book.publishedDate}</p>
            <p className="category">Category : {book.categories}</p>
            <p>Total Page : {book.printedPageCount}</p>
            <p>
              Preview :
              <a href={book.previewLink} target="_blank" rel="noreferrer">
                {book.previewLink}
              </a>
            </p>

            <div className="buttons">
              <NavLink
                to={`/library/${uid}`}
                style={{ textDecoration: "none" }}
              >
                <Tooltip title="back to previous" aria-label="SearchBooks">
                  <ArrowBackIcon style={{ fontSize: "2rem", color: "black" }} />
                </Tooltip>
              </NavLink>
              <Tooltip title="Add to Favourite" aria-label="SearchBooks">
                <FavoriteIcon
                  style={{ fontSize: "2rem", color: "red" }}
                  onClick={addtoWishlist}
                />
              </Tooltip>
              <a href={book.previewLink} target="_blank" rel="noreferrer">
                <Tooltip title="read the book" aria-label="SearchBooks">
                  <BookIcon style={{ fontSize: "2rem", color: "black" }} />
                </Tooltip>
              </a>
            </div>
          </div>
          <div className="book_img">
            <img src={bookimg.thumbnail} alt="Book" />
            <p>Title : {book.title}</p>
            <p>Author : {book.authors}</p>
          </div>
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
}

export default BookDetails;
