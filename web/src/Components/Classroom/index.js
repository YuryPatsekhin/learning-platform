import React from 'react';
import { useSelector } from "react-redux";
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import './classroom.css';

export const Classroom = () => {
  const user = useSelector(state => state.user);
  const theacherUuid = user ? user._id : null;
  const invitationLink = `${window.location.origin}/?theacher=${theacherUuid}`
  const teacherHasPupils = user && user.pupils;

  const renderPupils = () => {
    return (
      <ListItem button style={style} key={index}>
        <ListItemText primary={`Item ${index + 1}`} />
      </ListItem>
    );
  };

  return (
    <div className='classroomWrapper'>
      <h1>Classroom</h1>
      <p> Share this link with a student to invite them</p>
      <a href={invitationLink}>{invitationLink}</a>
      {/* my link: 
        <br />
        <br />
        <h1>myPupils:</h1>
        <br />
        {teacherHasPupils ?
          <ul>
            {
              user.pupils.map(user => <li>{user.name}</li>)
            }
          </ul>
          :
          null}  */}
    </ div>
  )
}
