import React, { useState, useEffect } from 'react';
import { Calendar } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import LessonInfo from './LessonInfo';
import EditLessonInfo from './EditLessonInfo';
import { useDispatch } from "react-redux";
import { updateLessons } from '~/Redux/Actions';
import './styles/schedule.css';

const Schedule = () => {
  const [events, addEvent] = useState([]);
  const [calendar, setCalendar] = useState(null);
  const [lessonInfoOpen, setLessonInfoOpen] = useState(false);
  const [editLessonInfoOpen, setEditLessonInfoOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedLesson, setSelectedLesson] = useState({});

  const dispatch = useDispatch();

  const updateCalendar = () => {
    dispatch(updateLessons(events));
  };

  useEffect(() => {
    if (!calendar) {
      initCalendar();
    } else {
      updateCalendar();
    };
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
    const event = {
      title: lessonInfo.theme,
      url: lessonInfo.material,
      start: selectedDate,
      test: 'test'
    };

    addEvent([...events, event]);
    calendar.addEvent(event);
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

  const initCalendar = () => {
    const calendarEl = document.getElementById('calendar');
    const calendar = new Calendar(calendarEl, {
      plugins: [interactionPlugin, dayGridPlugin],
      dateClick,
      eventClick,
      events
    });

    calendar.render();
    setCalendar(calendar);
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