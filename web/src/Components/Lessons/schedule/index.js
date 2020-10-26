import React from 'react';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import './schedule.css';

export default class Schedule extends React.Component {

  componentDidMount() {
      const calendarEl = document.getElementById('calendar');
      const calendar = new Calendar(calendarEl, {
        events: [
          {
            id: 'a',
            title: 'my event',
            start: '2020-10-11'
          }
        ],
        plugins: [ dayGridPlugin ]
      });
      calendar.render();
  }

  render() {
    return (
      <div className='calendar' id='calendar'></div>
    )
  }
}
