import React from 'react';
import { Schedule } from './components/Schedule';
import { useSelector } from "react-redux";
import { SelectPupil } from './components/SelectPupil';

export const Lessons = () => {
  return (
    <>
      <SelectPupil />
      <Schedule />
    </>
  )
}
