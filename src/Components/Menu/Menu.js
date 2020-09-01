import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import './menu.css';

class Menu extends React.Component {

  getList = () => {
    return (
      <div className="menu">
        <List>
          <ListItem button key={'Lessons'}>
            <ListItemText primary={'Lessons'} />
          </ListItem>
          <ListItem button key={'Vocabulary'}>
            <ListItemText primary={'Vocabulary'} />
          </ListItem>
        </List>
      </ div>
    )
  };

  render() {

    return (
      <Drawer anchor="left" variant="permanent">
        {this.getList()}
      </Drawer>
    )
  }
}

export default Menu