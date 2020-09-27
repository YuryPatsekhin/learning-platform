import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { closeRegistrationDialog, openLoginDialog } from '~Redux/Actions'
import { withStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from "react-redux";

const styles = {
  contentWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  buttons: {
    justifyContent: 'space-around',
  },
  fieldsWrapper: {
    marginBottom: '5px',
  },
  fields: {
    display: 'block',
    marginRight: '20px',
  },
  dialogTitle: {
    paddingBottom: '0px',
  },
  dialogText: {
    marginTop: '20px',
    width: '237px',
  },
  loginLink: {
    cursor: 'pointer',
    color: '#3f51b5',
    '&:hover': {
      color: '#23bfeb',
    }
  },
};

const SignUp = props => {
  const { classes } = props;
  const isDialogOpen = useSelector(state => state.isRegistrationDialogOpen);
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const handleCancel = () => {
    dispatch(closeRegistrationDialog());
  }

  const onLogInClick = () => {
    dispatch(openLoginDialog());
    dispatch(closeRegistrationDialog());
  }

  const onLoginChange = (e) => {
    const login = e.target.value;
    setLogin(login);
  }

  const onPasswordChange = (e) => {
    const password = e.target.value;
    setPassword(password);
  }


  const onSignUpClick = () => {
    console.log(login, password);
  }

  return (
    <Dialog onClose={handleCancel} open={isDialogOpen}>
      <DialogTitle className={classes.dialogTitle}>Sign up</DialogTitle>
      <DialogContent className={classes.contentWrapper}>
        <DialogContentText className={classes.dialogText}>Please fill in all fields to complete registration or <span className={classes.loginLink} onClick={onLogInClick}>log in</span></DialogContentText>
        <div className={classes.fieldsWrapper}>
          <TextField onChange={(e) => onLoginChange(e)} className={classes.fields} id="standard-basic" label="Login" />
          <TextField onChange={(e) => onPasswordChange(e)} className={classes.fields} id="standard-basic" label="Password" />
          <TextField className={classes.fields} id="standard-basic" label="Repeat password" />
        </div>
      </DialogContent>
      <DialogActions className={classes.buttons}>
        <Button onClick={handleCancel} color="primary">
          Cancel
        </Button>
        <Button onClick={onSignUpClick} color="primary">
          Sign up
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default withStyles(styles)(SignUp);
