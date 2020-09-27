import React from "react";
import Body from "./Components/Body";
import Header from "./Components/Header";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";

export default class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <Body />
        <Login />
        <SignUp />
      </React.Fragment>
    )
  }
}
