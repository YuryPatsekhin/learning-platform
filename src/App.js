import React from "react";
import Body from "./Components/Body";
import Header from "./Components/Header";
import Login from "./Components/Login";

export default class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <Body />
        <Login />
      </React.Fragment>
    )
  }
}
