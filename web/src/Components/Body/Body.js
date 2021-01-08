import React from 'react';
import Menu from '../Menu'
import { Content } from '../Content';

export default class Body extends React.Component {

  render() {
    return (
      <React.Fragment>
        <Menu/>
        <Content/>
      </React.Fragment>
    )
  }
} 
