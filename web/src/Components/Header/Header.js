import React from "react";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from "react-redux";
import { openLoginDialog, openRegistrationDialog, setUser } from '~/Redux/Actions';
import api from '~Services/api';
import "./header.css";

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  const onLoginButtonClick = () => {
    dispatch(openLoginDialog());
  }

  const onRegistrationButtonClick = () => {
    dispatch(openRegistrationDialog());
  }

  const onLogoutClick = () => {
    if (document.cookie.indexOf('session') !== -1) {
      api.logout(user).then(answer => {
        if (answer.user) {
          const user = answer.user;
        }
      });
    }
    dispatch(setUser(null));
  }

  return (
    <AppBar position="fixed">
      <Toolbar>
        <div className={user ? "logined-toolbar" : "toolbar"}>
          {user ?
            <>
              <Button color="inherit">{user.login}</Button>
              <Button onClick={onLogoutClick} color="inherit">Log out</Button>
            </>
            :
            <>
              <Button onClick={onLoginButtonClick} color="inherit">Login</Button>
              <Button onClick={onRegistrationButtonClick} color="inherit">Sign up</Button>
            </>
          }
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default Header;
