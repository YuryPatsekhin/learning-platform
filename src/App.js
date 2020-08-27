import React from "react";
import Body from "./Components/Body";
import Header from "./Components/Header";

export default class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Header/>
        <Body />
      </React.Fragment>
    )
  }
}
