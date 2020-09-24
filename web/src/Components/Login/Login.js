import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import api from '~/Services/api';
import { closeLoginDialog } from '~/Redux/Actions'
import { connect } from "react-redux";

const styles = {
  contentWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  fields: {
    display: 'block',
    marginRight: '20px',
  },
  dialogText: {
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
  }
};

class Login extends React.Component {

  handleCancel = () => {
    const { closeLoginDialog } = this.props;

    closeLoginDialog();
  }

  handleSubscribe = () => {
    const data = { login: 'test' };

    api.login(data);
  }

  onRegisterClick = () => {
    this.handleCancel();
  }

  render() {
    const { isLoginDialogOpen, classes } = this.props;

    return (
      <Dialog onClose={this.handleCancel} open={isLoginDialogOpen}>
        <DialogTitle className={classes.dialogTitle}>Login</DialogTitle>
        <DialogContent className={classes.contentWrapper}>
          <DialogContentText className={classes.dialogText}>Please sign in to your account or <span onClick={this.onRegisterClick} className={classes.registerLink}>register</span></DialogContentText>
          <div className={classes.fieldsWrapper}>
            <TextField className={classes.fields} id="standard-basic" label="Login" />
            <TextField className={classes.fields} id="standard-basic" label="Password" />
          </div>
        </DialogContent>
        <DialogActions className={classes.buttons}>
          <Button onClick={this.handleCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={this.handleSubscribe} color="primary">
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
    closeLoginDialog: () => dispatch(closeLoginDialog()),
  }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Login));