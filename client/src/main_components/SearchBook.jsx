import React from "react";
import "./styles/searchbook.css";
import CircularProgress from "@material-ui/core/CircularProgress";
import { NavLink } from "react-router-dom";
import Footer from "../components/Footer";
import MoreIcon from "@material-ui/icons/More";
import Tooltip from "@material-ui/core/Tooltip";

function SearchBook({ searchBook, loading, id }) {
  if (loading) {
    return (
      <CircularProgress
        color="secondary"
        size="5rem"
        style={{ marginTop: "38vh" }}
      />
    );
  } else {
    return (
      <>
        <div className="search_result">
          {searchBook.map((search) => (
            <div key={search.id} className="seacrh_box">
              <img
                src={search.volumeInfo.imageLinks.thumbnail}
                alt="Book"
                className="search_book_img"
              />
              <h3>
                Title<span>{search.volumeInfo.title}</span>
              </h3>
              <h5>
                Author <span>{search.volumeInfo.authors}</span>
              </h5>
              <div className="buttons">
                <NavLink to={`/bookdetails/${search.id}/${id}`}>
                  <Tooltip title="More Details" aria-label="SeachBooks">
                    <MoreIcon style={{ fontSize: "2rem", color: "red" }}/>
                  </Tooltip>
                </NavLink>
              </div>
            </div>
          ))}
        </div>
        <Footer />
      </>
    );
  }
}

export default SearchBook;
