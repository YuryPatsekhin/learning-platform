import React, { useState, useEffect } from 'react';
import { updateLessons } from '~Redux/Actions'
import { Calendar } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import LessonInfo from './LessonInfo';
import EditLessonInfo from './EditLessonInfo';
import { useDispatch, useSelector } from "react-redux";
import api from '~/Services/api';
import { v4 as uuidv4 } from 'uuid';
import './styles/schedule.css';

export const Schedule = () => {
  const [calendar, setCalendar] = useState(null);
  const [lessonInfoOpen, setLessonInfoOpen] = useState(false);
  const [editLessonInfoOpen, setEditLessonInfoOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedLesson, setSelectedLesson] = useState({});
  const dispatch = useDispatch();

  const pupil = useSelector(state => state.lessons.currentPupil);

  const lessons = useSelector(state => {
    const schedule = state.lessons.schedules.find(schedule => schedule.pupil === pupil);
    return schedule && schedule.lessons;
  });

  useEffect(() => {
    // console.log('lessons', lessons)  
    if (pupil) {
      if (lessons) {
        initCalendar(lessons);
      } else {
        api.getLessons(pupil).then(answer => {
          if (answer && answer.lessons) {
            const lessons = answer.lessons;
            dispatch(updateLessons({ pupil, lessons }));
            initCalendar(lessons);
          } else {
            initCalendar([]);
          }
        })
      }
    }
  }, [pupil, lessons]);

  const eventClick = (info) => {
    info.jsEvent.preventDefault();

    const lesson = {
      theme: info.event.title,
      material: info.event.url,
      id: info.event.id,
    };

    setSelectedLesson(lesson);
    openLessonInfo();
  };

  const addLesson = (lessonInfo) => {
    const event = {
      title: lessonInfo.theme,
      url: lessonInfo.material,
      start: selectedDate,
      test: 'test',
    };

    const id = uuidv4();

    const lesson = {
      event,
      pupil,
      id
    };

    api.addLesson(lesson).then(answer => {
      if (answer && answer.lessons) {
        const lessons = answer.lessons;
        dispatch(updateLessons({ pupil, lessons }));
        calendar.addEvent(event);
      };
    });
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
    setEditLessonInfoOpen(true);
  };

  const initCalendar = (lessons) => {
    const calendarEl = document.getElementById('calendar');
    const calendar = new Calendar(calendarEl, {
      plugins: [interactionPlugin, dayGridPlugin],
      dateClick,
      eventClick,
      events: lessons,
    });

    calendar.render();
    setCalendar(calendar);
  };

  return (
    pupil &&
    <>
      <LessonInfo initCalendar={initCalendar} lesson={selectedLesson} open={lessonInfoOpen} openEditLessonInfo={openEditLessonInfo} closeLessonInfo={closeLessonInfo} />
      <EditLessonInfo open={editLessonInfoOpen} closeEditLessonInfo={closeEditLessonInfo} addLesson={addLesson} />
      <div className='calendar' id='calendar'></div>
    </>
  );
};
