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

    return (
      <Drawer anchor="left" variant="permanent">
        {this.getList()}
      </Drawer>
    )
  }
}

export default Menu