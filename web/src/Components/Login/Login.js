import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import api from '~/Services/api';
import { closeLoginDialog, openRegistrationDialog, setUser } from '~/Redux/Actions'
import { connect } from "react-redux";

const styles = {
  contentWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  fields: {
    display: 'block',
    marginRight: '20px',
  },
  dialogText: {
    marginTop: '20px',
    width: '237px',
  },
  buttons: {
    justifyContent: 'space-around',
  },
  dialogTitle: {
    paddingBottom: '0px',
  },
  fieldsWrapper: {
    marginBottom: '5px',
  },
  registerLink: {
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

class Login extends React.Component {

  state = {
    login: '',
    password: '',
  }

  handleCancel = () => {
    const { closeLoginDialog } = this.props;

    closeLoginDialog();
  }

  onLoginChange = (e) => {
    this.setState({
      login: e.target.value,
    })
  }

  onPasswordChange = (e) => {
    this.setState({
      password: e.target.value,
    })
  }

  handleLogin = () => {
    const { closeLoginDialog, setUser } = this.props;
    const { login, password } = this.state;

    const form = {
      login,
      password
    }

    api.login(form).then(answer => {
      if (answer.error) {
        this.setState({ error: answer.error });
        return
      }
      console.log(1, answer);
      if (answer.user) {
        setUser(answer.user);
        closeLoginDialog();
        return
      };
    }).catch((e) => {
      this.setState({ error: 'Something went wrong' });
      console.log(e)
    });
  }

  render() {
    const { isLoginDialogOpen, classes } = this.props;
    const { error } = this.state;

    return (
      <Dialog onClose={this.handleCancel} open={isLoginDialogOpen}>
        <DialogTitle className={classes.dialogTitle}>Login</DialogTitle>
        <DialogContent className={classes.contentWrapper}>
          <DialogContentText className={classes.dialogText}>Please sign in to your account or <span onClick={this.onSignUpClick} className={classes.registerLink}>sign up</span></DialogContentText>
          <div className={classes.fieldsWrapper}>
            <TextField onChange={this.onLoginChange} className={classes.fields} id="standard-basic" label="Login" />
            <TextField onChange={this.onPasswordChange} className={classes.fields} id="standard-basic" label="Password" />
            {error ? <DialogContentText className={classes.error}>{error}</DialogContentText> : null}
          </div>
        </DialogContent>
        <DialogActions className={classes.buttons}>
          <Button onClick={this.handleCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={this.handleLogin} color="primary">
            Log in
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

const mapStateToProps = state => {
  return {
    isLoginDialogOpen: state.isLoginDialogOpen,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    openRegistrationDialog: () => dispatch(openRegistrationDialog()),
    closeLoginDialog: () => dispatch(closeLoginDialog()),
    setUser: (user) => dispatch(setUser(user)),
  }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Login));