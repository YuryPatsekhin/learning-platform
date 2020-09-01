import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { connect } from "react-redux";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { closeMenu } from '~Redux/Actions';
import './menu.css';

class Menu extends React.Component {

  onMenuClose = () => {
    const { closeMenu } = this.props;

    closeMenu();
  }

  getList = () => {
    return (
      <div className="menu">
        <div className="closeIconWrapper">
          <ArrowBackIosIcon className="closeIcon" onClick={this.onMenuClose} />
        </div>
        <List>
          <ListItem button key={'one'}>
            <ListItemText primary={'one'} />
          </ListItem>
          <ListItem button key={'two'}>
            <ListItemText primary={'two'} />
          </ListItem>
          <ListItem button key={'three'}>
            <ListItemText primary={'three'} />
          </ListItem>
        </List>
      </ div>
    )
  };

  render() {
    const { menuIsOpen } = this.props;

    return (
      <Drawer anchor="left" open={menuIsOpen}>
        {this.getList()}
      </Drawer>
    )
  }
}

const mapStateToProps = state => {
  return {
    menuIsOpen: state.menuIsOpen
  };
};

const mapDispatschToProps = dispatch => {
  return {
    closeMenu: () => dispatch(closeMenu()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatschToProps,
)(Menu);

