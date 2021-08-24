import { Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import About from "./components/About";
import Contact from "./components/Contact";
import WishList from "./components/WishList";
import Login from "./components/Login";
import Signup from "./components/Signup";
import RequestBook from "./components/RequestBook";
import Logout from "./components/Logout";
import Library from "./main_components/Library";
import BookDetails from "./main_components/BookDetails";
import Profile from "./components/Profile";
import Todo from "./components/Todo";
function App() {
  return (
    <>
      <NavBar />
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/about">
        <About />
      </Route>
      <Route exact path="/contact">
        <Contact />
      </Route>
      <Route exact path="/login">
        <Login />
      </Route>
      <Route exact path="/signup">
        <Signup />
      </Route>
      <Route exact path="/wishlist/:id">
        <WishList />
      </Route>
      <Route exact path="/logout">
        <Logout />
      </Route>
      <Route exact path="/request">
        <RequestBook />
      </Route>
      <Route exact path="/profile/:id">
        <Profile />
      </Route>
      <Route exact path="/library/:id">
        <Library />
      </Route>
      <Route exact path="/bookdetails/:id/:uid">
        <BookDetails />
      </Route>

    </>
  );
}

export default App;
