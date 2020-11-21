import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';
import { useSelector } from "react-redux";
import { ROLES } from '~constants';
import { Link } from "react-router-dom";

const styles = {
  drawerPaper: {
    marginTop: '64px',
    width: '200px',
  }
}

const Menu = props => {
  const { classes } = props;
  const user = useSelector(state => state.user);
  const isTeacher = user && user.role === ROLES.TEACHER;

  const getList = () => (
    <List>
      <ListItem component={Link} to="/lessons" button key={'Lessons'}>
        <ListItemText primary={'Lessons'} />
      </ListItem>
      <ListItem component={Link} to="/vocabulary" button key={'Vocabulary'}>
        <ListItemText primary={'Vocabulary'} />
      </ListItem>
      {/* {isTeacher ? */}
      <ListItem component={Link} to="/classroom" button key={'classroom'}>
        <ListItemText primary={'Classroom'} />
      </ListItem>
      {/* :
        null
      } */}
    </List>
  )

  return (
    <Drawer classes={{ paper: classes.drawerPaper }} className={classes.menu} anchor="left" variant="permanent">
      {getList()}
    </Drawer>
  )
}




export default withStyles(styles)(Menu);