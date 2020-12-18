import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Body from "./Components/Body";
import Header from "./Components/Header";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import { useDispatch } from "react-redux";
import { setTheacher, setUser, setPupilForSchedule } from '~Redux/Actions';
import { getCookie } from "~utils/CookieByName";
import api from '~/Services/api';

export const App = () => {
  const dispatch = useDispatch();

  const user = useSelector(state => state.user);

  console.log(user)
  const isPupil = (user) => {
    return user.role === 'pupil';
  };

  useEffect(() => {
    if (user && isPupil(user)) {
      dispatch(setPupilForSchedule(user._id));
    } else {
      dispatch(setPupilForSchedule(""));
    }
  }, [user])

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const theacherId = urlParams.get('theacher');

    if (theacherId) {
      dispatch(setTheacher(theacherId))
    };

    if (document.cookie.indexOf('session') !== -1) {
      const token = getCookie('session');

      api.resumeSession(token).then(answer => {
        if (answer.user) {
          const user = answer.user;

          if (isPupil(user)) {
            dispatch(setPupilForSchedule(user._id));
          }

          dispatch(setUser(user));
        }
      });
    };
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
