import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";

const styles = {
  drawerPaper: {
    marginTop: '64px',
    width: '200px',
  }
}

const Menu = props => {
  const { classes } = props;


  const getList = () => (
    <List>
      <ListItem component={Link} to="/lessons" button key={'Lessons'}>
        <ListItemText primary={'Lessons'} />
      </ListItem>
      <ListItem component={Link} to="vocabulary" button key={'Vocabulary'}>
        <ListItemText primary={'Vocabulary'} />
      </ListItem>
    </List>
  )

  return (
    <Drawer classes={{ paper: classes.drawerPaper }} className={classes.menu} anchor="left" variant="permanent">
      {getList()}
    </Drawer>
  )
}




export default withStyles(styles)(Menu);