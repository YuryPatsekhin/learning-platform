import React, { useEffect } from "react";
import Body from "./Components/Body";
import Header from "./Components/Header";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import { useDispatch } from "react-redux";
import { setTheacher } from '~Redux/Actions'

export const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const theacherId = urlParams.get('theacher');
    if (theacherId) {
      dispatch(setTheacher(theacherId))
    }
  })

  return (
    <React.Fragment>
      <Header />
      <Body />
      <Login />
      <SignUp />
    </React.Fragment>
  )
}
