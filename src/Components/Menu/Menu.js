import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { connect } from "react-redux";

class Menu extends React.Component {

  getList = () => {
    return (
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
    )
  };

  render() {
    const { menuIsOpen } = this.props;

    return (
      <React.Fragment>
        <Drawer anchor="left" open={menuIsOpen}>
          {this.getList()}
        </Drawer>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    menuIsOpen: state.menuIsOpen
  };
};

export default connect(
  mapStateToProps
)(Menu);

