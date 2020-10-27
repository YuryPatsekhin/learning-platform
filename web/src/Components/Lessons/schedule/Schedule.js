import React, { useState, useEffect } from 'react';
import { Calendar } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import LessonInfo from './LessonInfo';
import EditLessonInfo from './EditLessonInfo';
import './styles/schedule.css';

const Schedule = props => {
  const [events, setEvent] = useState([]);
  const [lessonInfoOpen, setLessonInfoOpen] = useState(false);
  const [editLessonInfoOpen, setEditLessonInfoOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedLesson, setSelectedLesson] = useState({});

  useEffect(() => {
    setCalendar();
  });

  const eventClick = (info) => {
    info.jsEvent.preventDefault();
    const lesson = {
      theme: info.event.title,
      material: info.event.url,
    }
    setSelectedLesson(lesson);
    openEditLessonInfo();
  };

  const addLesson = (lessonInfo) => {
    setEvent([...events, {
      title: lessonInfo.theme,
      url: lessonInfo.material,
      start: selectedDate,
      test: 'test'
    }]);
  };

  const openLessonInfo = () => {
    setLessonInfoOpen(true);
  };

  const openEditLessonInfo = () => {
    setEditLessonInfoOpen(true);
  };

  const closeLessonInfo = () => {
    setLessonInfoOpen(false);
  };

  const closeEditLessonInfo = () => {
    setEditLessonInfoOpen(false);
  };

  const dateClick = (info) => {
    setSelectedDate(info.dateStr);
    setLessonInfoOpen(true);
  };

  const setCalendar = () => {
    const calendarEl = document.getElementById('calendar');
    const calendar = new Calendar(calendarEl, {
      plugins: [interactionPlugin, dayGridPlugin],
      dateClick,
      eventClick,
      events
    });

    calendar.render();
  };

  return (
    <React.Fragment>
      <EditLessonInfo lesson={selectedLesson} open={editLessonInfoOpen} openLessonInfo={openLessonInfo} closeEditLessonInfo={closeEditLessonInfo} />
      <LessonInfo open={lessonInfoOpen} closeLessonInfo={closeLessonInfo} addLesson={addLesson} />
      <div className='calendar' id='calendar'></div>
    </React.Fragment>
  );
};

export default Schedule;