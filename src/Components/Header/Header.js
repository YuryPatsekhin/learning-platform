import React from "react";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { connect } from "react-redux";
import { openMenu } from '~/Redux/Actions';

class Header extends React.Component {

  onClick = () => {
    const { openMenu } = this.props;

    openMenu();
  }

  render() {
    return (
      <AppBar position="static">
        <Toolbar>
          <IconButton onClick={this.onClick} edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    openMenu: () => dispatch(openMenu())
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Header);
