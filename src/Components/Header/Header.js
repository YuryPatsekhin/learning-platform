import React from "react";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import "./header.css";

class Header extends React.Component {

  render() {
    return (
      <AppBar position="fixed">
        <Toolbar>
          <div className="toolbar">
            <Button color="inherit">Login</Button>
          </div>
        </Toolbar>
      </AppBar>
    );
  }
}

export default Header;
