import React, { Suspense } from 'react';
import { Route, Switch } from "react-router-dom";
import Auth from "../hoc/auth";

import LandingPage from "./views/LandingPage/LandingPage.js";
import LoginPage from "./views/LoginPage/LoginPage.js";
import RegisterPage from "./views/RegisterPage/RegisterPage.js";
import NavBar from "./views/NavBar/NavBar";
import Footer from "./views/Footer/Footer"
import BookDetail from "./views/MovieDetail/BookDetail"
import FavoritePage from "./views/FavoritePage/FavoritePage"
import AddAuthorPage from "./views/AuthorPage/AddAuthorPage"
import AddBookPage from "./views/BookPage/AddBookPage"
import EditBookPage from "./views/MovieDetail/Sections/EditBookPage"
import AuthorPage from "./views/AuthorPage/AuthorPage"

function App() {
  return (
    <Suspense fallback={(<div>Завантаження...</div>)}>
      <NavBar />
      <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route exact path="/book/:bookId" component={Auth(BookDetail, null)} />
            <Route exact path="/favorite" component={Auth(FavoritePage, null)} />
            <Route exact path="/addAuthor" component={Auth(AddAuthorPage, true)} />
            <Route exact path="/addBook" component={Auth(AddBookPage, true)} />
            <Route exact path="/editBook/:bookId" component={Auth(EditBookPage, true)} />
            <Route exact path="/authors" component={Auth(AuthorPage, null)} />
        </Switch>
      </div>
      <Footer />
    </Suspense>
  );
}

export default App;
