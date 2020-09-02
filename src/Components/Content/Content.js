import React from 'react';
import { Switch, Route } from "react-router-dom";
import Lessons from '../Lessons';
import Vocabulary from '../Vocabulary';
import './content.css';

export default class Content extends React.Component {

  render() {
    return (
      <div className='content'>
        <Switch>
          <Route path="/lessons">
            <Lessons />
          </Route>
          <Route path="/vocabulary">
            <Vocabulary />
          </Route>
        </Switch>
      </div>
    )
  }
}
