import React, { useEffect } from "react";
import Body from "./Components/Body";
import Header from "./Components/Header";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import { useDispatch } from "react-redux";
import { setTheacher, setUser } from '~Redux/Actions';
import { getCookie } from "~utils/CookieByName";
import api from '~/Services/api';

export const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const theacherId = urlParams.get('theacher');
    if (theacherId) {
      dispatch(setTheacher(theacherId))
    }
    if (document.cookie.indexOf('session') !== -1) {
      const token = getCookie('session');
      api.login({ token }).then(answer => {
        if (answer.user) {
          const user = answer.user;
          dispatch(setUser(user));
        }
      });
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
