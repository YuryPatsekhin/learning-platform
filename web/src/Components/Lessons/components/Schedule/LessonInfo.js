import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const LessonInfo = props => {
  const { open, closeLessonInfo } = props;
  const [lessonInfo, setLessonInfo] = useState({});

  const handleAdd = () => {
    const { addLesson, closeLessonInfo } = props;

    closeLessonInfo();
    addLesson(lessonInfo);
  };

  return (
    <Dialog open={open} onClose={closeLessonInfo} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Lesson info</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Fill all fields to add new lesson
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Theme"
          fullWidth
          variant="outlined"
          onChange={(e) => {setLessonInfo({...lessonInfo, theme: e.target.value})}}
        />
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Educational materials"
          fullWidth
          variant="outlined"
          onChange={(e) => {setLessonInfo({...lessonInfo, material: e.target.value})}}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={closeLessonInfo} color="primary">
          Cancel
          </Button>
        <Button onClick={handleAdd} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default LessonInfo;