import React from 'react';
import { Schedule } from './components/Schedule';
import { ROLES } from '~constants';
import { useSelector } from "react-redux";
import { SelectPupil } from './components/SelectPupil';

export const Lessons = () => {

  const user = useSelector(state => state.user)
  const isTecher = user && user.role === ROLES.TEACHER;
  return (
    <>
      {isTecher ? <SelectPupil /> : null}
      <Schedule />
    </>
  )
}
