import React from "react";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { useDispatch } from "react-redux";
import { openLoginDialog, openRegistrationDialog } from '~/Redux/Actions';
import "./header.css";

const Header = () => {
  const dispatch = useDispatch();

  const onLoginButtonClick = () => {
    dispatch(openLoginDialog())
  }

  const onRegistrationButtonClick = () => {
    dispatch(openRegistrationDialog())
  }

  return (
    <AppBar position="fixed">
      <Toolbar>
        <div className="toolbar">
          <Button onClick={onLoginButtonClick} color="inherit">Login</Button>
          <Button onClick={onRegistrationButtonClick} color="inherit">Sign up</Button>
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default Header;
