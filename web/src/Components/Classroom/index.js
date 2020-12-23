import React from 'react';
import { useSelector } from "react-redux";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import './classroom.css';

export const Classroom = () => {
  const user = useSelector(state => state.user);
  const pupils = user.pupils;
  console.log(pupils);
  const theacherUuid = user ? user._id : null;
  const invitationLink = `${window.location.origin}/?theacher=${theacherUuid}`

  return (
    <div className='classroomWrapper'>
      <h1>Classroom</h1>
      <p> Share this link with a student to invite them</p>
      <a href={invitationLink}>{invitationLink}</a>
      <h2>my pupils:</h2>
      {pupils &&
        <ul className='list'>
          {
            pupils.map(pupil => <li className='li' key={pupil.id}>{pupil.name}</li>)
          }
        </ul>
      }
    </ div>
  )
}
