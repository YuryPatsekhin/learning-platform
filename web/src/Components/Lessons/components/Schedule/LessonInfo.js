import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Link from '@material-ui/core/Link';
import DialogTitle from '@material-ui/core/DialogTitle';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import { deleteLesson } from '~Redux/Actions'
import api from '~/Services/api';
import './styles/lessonInfo.css';

const LessonInfo = props => {
  const dispatch = useDispatch();

  const { open, closeLessonInfo, initCalendar, lesson } = props;

  const pupil = useSelector(state => state.lessons.currentPupil);

  const handleEdit = () => {
    const { openEditLessonInfo } = props;
    closeLessonInfo();
    openEditLessonInfo('');
  };


  const onDeleteClick = () => {
    api.deleteLesson({ pupil, lessonId: lesson.id }).then(answer => {
      dispatch(deleteLesson({ pupil, lessonId: lesson.id }));
      closeLessonInfo();
    })
  };

  return (
    <Dialog open={open} onClose={closeLessonInfo} aria-labelledby="form-dialog-title">
      <div className='titleWrapper'>
        <DialogTitle id="form-dialog-title">Lesson info</DialogTitle>
        <DeleteIcon className='icon' onClick={onDeleteClick} />
        <EditIcon className='icon' onClick={handleEdit} />
        <CloseIcon className='icon' onClick={closeLessonInfo} />
      </div>
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
    </Dialog>
  );
}

export default LessonInfo;