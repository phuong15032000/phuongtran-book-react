import logo from './logo.svg';
import './App.css';
import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import Index from "./components/index.component";
import Login from "./components/login.component";
import User_Index from "./components/user-index.component";
import SingleBook from "./components/detail-book.component";
import mybooksComponent from './components/mybooks.component';
import addBook from './components/add-book.component';
import editBookComponent from './components/edit-book.component';
import unauthedDetail from './components/unauthed-detail.component'

import Admin_Index from "./components/admin-index.component"
import Admin_add_book from "./components/admin-add-book.component";
import Admin_my_book from "./components/admin-mybooks.component";
import Admin_edit_book from "./components/admin-edit-book.component";
import Admin_detail_book from "./components/admin-detail-post.component";
import Admin_manage_book from "./components/admin-book-manager.component"

function App() {
  if (!localStorage.getItem("user")) {
    return (
      <Switch>
        <Route exact path={["/", "/index"]} component={Index} />
        <Route exact path={"/login"} component={Login} />
        <Route exact path={"/book/:id"} component={unauthedDetail} />
      </Switch>
    );
  }
  else {
    if (JSON.parse(localStorage.getItem('user')).role.id == 1) {
      return (
        <Switch>
          <Route exact path={["/", "/index"]} component={Admin_Index} />
          <Route exact path={"/login"} component={Login} />
          <Route exact path={"/book/:id"} component={Admin_detail_book} />
          <Route exact path={"/mybooks"} component={Admin_my_book} />
          <Route exact path={"/manage-book"} component={Admin_manage_book} />
          <Route exact path={"/add-book"} component={Admin_add_book} />
          <Route exact path={"/edit-book/:id"} component={Admin_edit_book} />
        </Switch>
      )
    }
    else {
      return (
        <Switch>
          <Route exact path={["/", "/index"]} component={User_Index} />
          <Route exact path={"/login"} component={Login} />
          <Route exact path={"/book/:id"} component={SingleBook} />
          <Route exact path={"/mybooks"} component={mybooksComponent} />
          <Route exact path={"/add-book"} component={addBook} />
          <Route exact path={"/edit-book/:id"} component={editBookComponent} />
        </Switch>
      )
    }
  }
}

export default App;
