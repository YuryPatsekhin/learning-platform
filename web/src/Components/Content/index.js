import React from 'react';
import { useSelector } from "react-redux";
import { Switch, Route } from "react-router-dom";
import { Lessons } from '../Lessons';
import { Vocabulary } from '../Vocabulary';
import { Classroom } from '../Classroom';
import './content.css';

export const Content = () => {
  const user = useSelector(state => state.user);

  return (
    user &&
    <div className='content'>
      <Switch>
        <Route path="/lessons">
          <Lessons />
        </Route>
        <Route path="/vocabulary">
          <Vocabulary />
        </Route>
        <Route path="/classroom">
          <Classroom />
        </Route>
      </Switch>
    </div>
  )
}
