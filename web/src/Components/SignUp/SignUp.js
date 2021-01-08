import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { closeRegistrationDialog, setUser, openLoginDialog } from '~Redux/Actions'
import { withStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import { useDispatch, useSelector } from "react-redux";
import api from '~Services/api';

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
    marginBottom: '20px',
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
  error: {
    margin: '0px',
    color: 'red',
    width: '210px',
  }
};

const SignUp = props => {
  const { classes } = props;
  const isDialogOpen = useSelector(state => state.isRegistrationDialogOpen);
  const theacher = useSelector(state => state.theacher);
  const [login, setLogin] = useState('');
  const [error, setError] = useState('');
  const [role, setRole] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const dispatch = useDispatch();

  const onLogInClick = () => {
    dispatch(openLoginDialog());
    dispatch(closeRegistrationDialog());
  };

  const onLoginChange = (e) => {
    const login = e.target.value;
    setLogin(login);
  };

  const onPasswordChange = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const onRepeatPasswordChange = (e) => {
    const repeatPassword = e.target.value;
    setRepeatPassword(repeatPassword);
  };

  const onSelect = (event) => {
    setRole(event.target.value);
  }

  const onSignUpClick = () => {
    if (password !== repeatPassword) {
      setError('Passwords do not match');
      return;
    };
    const form = {
      login,
      password,
      role,
      theacher
    };
    api.validate(form).then(data => {
      if (data.isValidForm) {
        api.signup(form).then((data) => {
          dispatch(setUser(data));
          dispatch(closeRegistrationDialog());
        })
      } else {
        setError(data.error);
      };
    }).catch((e) => {
      this.setState({ error: 'Something went wrong' });
      console.log(e);
    })
  };

  return (
    <Dialog open={isDialogOpen}>
      <DialogTitle className={classes.dialogTitle}>Sign up</DialogTitle>
      <DialogContent className={classes.contentWrapper}>
        <DialogContentText className={classes.dialogText}>Please fill in all fields to complete registration or <span className={classes.loginLink} onClick={onLogInClick}>log in</span></DialogContentText>
        <div className={classes.fieldsWrapper}>
          <TextField onChange={onLoginChange} className={classes.fields} id="standard-basic" label="Login" />
          <TextField onChange={onPasswordChange} className={classes.fields} id="standard-basic" label="Password" />
          <TextField onChange={onRepeatPasswordChange} className={classes.fields} id="standard-basic" label="Repeat password" />
          <InputLabel id="demo-simple-select-label">Role</InputLabel>
          <Select
            className={classes.fields}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={role}
            onChange={onSelect}
          >
            <MenuItem value={'teacher'}>teacher</MenuItem>
            <MenuItem value={'pupil'}>pupil</MenuItem>
          </Select>
          <div>
          </div>
          {error ? <DialogContentText className={classes.error}>{error}</DialogContentText> : null}
        </div>
      </DialogContent>
      <DialogActions className={classes.buttons}>
        <Button onClick={onSignUpClick} color="primary">
          Sign up
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default withStyles(styles)(SignUp);
