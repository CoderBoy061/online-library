import React, { useState } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { NavLink } from "react-router-dom";
import MoreIcon from "@material-ui/icons/More";

import "./styles/booklist.css";
import Footer from "../components/Footer";
import Tooltip from "@material-ui/core/Tooltip";
import Snackbar from "@material-ui/core/Snackbar";
function BookList({ books, loading, id }) {
  const [alert, setAlert] = useState({ showSnackbar: false, message: "" });
  const closeSnack = () => {
    setAlert({
      showSnackbar: false,
    });
  };

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
        <div className="book_list">
          {books.map((book) => (
            <div key={book.id} className="book_list_box">
              <img
                src={book.volumeInfo.imageLinks.thumbnail}
                alt="Book"
                className="book_img"
              />
              <h3>
                Title<span>{book.volumeInfo.title}</span>
              </h3>
              <h5>
                Author <span>{book.volumeInfo.authors}</span>
              </h5>
              <div className="book_buttons">
                <NavLink to={`/bookdetails/${book.id}/${id}`}>
                  <Tooltip title="More Details" aria-label="BookList">
                    <MoreIcon style={{ fontSize: "2rem", color: "red" }} />
                  </Tooltip>
                </NavLink>
              </div>
            </div>
          ))}
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

export default BookList;
