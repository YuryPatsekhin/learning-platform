import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Link from '@material-ui/core/Link';
import DialogTitle from '@material-ui/core/DialogTitle';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

const EditLessonInfo = props => {
  const { open, closeEditLessonInfo, lesson } = props;

  const handleEdit = () => {
    const { closeEditLessonInfo, openLessonInfo } = props;
    closeEditLessonInfo();
    openLessonInfo('')
  };

  return (
    <Dialog open={open} onClose={closeEditLessonInfo} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Lesson info</DialogTitle>
      <DialogContent>
        <Table aria-label="simple table">
          <TableBody>
            <TableRow>
              <TableCell>Theme: </TableCell>
              <TableCell align="right">{lesson.theme}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Materials: </TableCell>
              <TableCell align="right">
                <Link href={lesson.material}>
                  Go to lesson!
              </Link>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeEditLessonInfo} color="primary">
          Cancel
          </Button>
        <Button onClick={handleEdit} color="primary">
          Edit
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditLessonInfo;