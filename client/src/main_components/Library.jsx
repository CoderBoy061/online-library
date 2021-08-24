import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import "./styles/library.css";
import BookList from "./BookList";
import { useParams } from "react-router";
import axios from "axios";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import CircularProgress from "@material-ui/core/CircularProgress";
import SearchBook from "./SearchBook";
import Snackbar from "@material-ui/core/Snackbar";

function Library() {
  const {id} = useParams();
  const apiKey = "AIzaSyBJe4Z5KP2Hhg5s_vFDCbe8stRDNCeUoE4";
  const [books, setBooks] = useState([]);
  const [searchBook, setSearchBooks] = useState([]);
  const [searchinput, setsearchInput] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dialog, setDialoag] = useState(false);
  const [alert, setAlert] = useState({ showSnackbar: false, message: "" });
  // console.log(id);
  const closeDialog = () => {
    setDialoag(false);
  };
  const searchResult = async (e) => {
    e.preventDefault();
    try {
      if (searchinput === "") {
        setAlert({
          showSnackbar: true,
          message: "Please enter bookname",
        });
      } else {
        setLoading(true);
        setDialoag(true);
        const response = await axios.get(
          `https://www.googleapis.com/books/v1/volumes?q=${searchinput}`
        );
        setSearchBooks(response.data.items);
        console.log(response.data.items);
        setShow(true);
        setLoading(false);
        setDialoag(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const renderBooks = async () => {
    setLoading(true);
    const res = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=javascript:keyes&key=${apiKey}`
    );
    setBooks(res.data.items);
    setLoading(false);
  };
  const closeSnack = () => {
    setAlert({
      showSnackbar: false,
    });
  };
  useEffect(() => {
    renderBooks();
  }, []);
  return (
    <div className="library">
      <h2>Welcome to Online Library</h2>
      <div className="search_section">
        <input
          type="text"
          className="search_input"
          placeholder="Search...."
          onChange={(e) => setsearchInput(e.target.value)}
        />
        <Button
          variant="contained"
          color="secondary"
          id="search_btn"
          onClick={searchResult}
        >
          Search
        </Button>
      </div>
      {show ? (
        <div className="searched_books">
          <SearchBook searchBook={searchBook} loading={loading} id={id} />
        </div>
      ) : (
        <div className="render_books">
          <BookList books={books} loading={loading} id={id} />
        </div>
      )}
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        open={alert.showSnackbar}
        message={alert.message}
        autoHideDuration={3000}
        onClose={closeSnack}
      />
      <Dialog open={dialog} onClose={closeDialog}>
        <DialogContent color="black">
          <DialogContentText id="alert-dialog-description">
            <CircularProgress color="secondary" size="3rem" />
            <p style={{ fontFamily: "cursive", color: "blue" }}>wait...</p>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Library;
