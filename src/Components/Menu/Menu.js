import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from "react-router-dom";
import './menu.css';

class Menu extends React.Component {

  getList = () => {
    return (
      <div className="menu">
        <List>
          <Link to="/lessons">
            <ListItem button key={'Lessons'}>
              <ListItemText primary={'Lessons'} />
            </ListItem>
          </Link>
          <Link to="/vocabulary">
            <ListItem button key={'Vocabulary'}>
              <ListItemText primary={'Vocabulary'} />
            </ListItem>
          </Link>
        </List>
      </ div>
    )
  };

  render() {

    return (
      <div className='drawer'>
        <Drawer anchor="left" variant="permanent">
          {this.getList()}
        </Drawer>
      </div>
    )
  }
}

export default Menu