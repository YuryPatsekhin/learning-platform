import React, { useState } from 'react';
import { useSelector } from "react-redux";

export const Classroom = () => {
  const user = useSelector(state => state.user);
  const theacherUuid = user ? user._id : null;
  const invitationLink = `${window.location.origin}/?theacher=${theacherUuid}`
  const teacherHasPupils = user && user.pupils;

  return (
    <>
      my link: <a href={invitationLink}>{invitationLink}</a>
      <br />
      <br />
      myPupils:
      <br />
      {teacherHasPupils ?
        <ul>
          {
            user.pupils.map(user => <li>{user.name}</li>)
          }
        </ul>
        :
        null}
    </>

  )
}
