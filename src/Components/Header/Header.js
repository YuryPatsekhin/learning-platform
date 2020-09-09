import React from "react";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { connect } from "react-redux";
import { openLoginDialog } from '~/Redux/Actions'
import "./header.css";

class Header extends React.Component {

  onLoginButtonClick = () => {
    const { openLoginDialog } = this.props;

    openLoginDialog()
  }

  render() {
    return (
      <AppBar position="fixed">
        <Toolbar>
          <div className="toolbar">
            <Button onClick={this.onLoginButtonClick} color="inherit">Login</Button>
          </div>
        </Toolbar>
      </AppBar>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    openLoginDialog: () => dispatch(openLoginDialog())
  }
}

export default connect(null, mapDispatchToProps)(Header);
