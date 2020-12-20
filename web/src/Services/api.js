import { ENV } from '~constants';

const APIBaseUrl = process.env.NODE_ENV === ENV.DEV
  ? "http://localhost:3000"
  : "https://learning-platform13.herokuapp.com";

const api = {
  resumeSession: (token) => fetch(`${APIBaseUrl}/resumeSession/${token}`, {
    method: 'GET',
  }).then(data => data.json()),
  login: (data) => fetch(`${APIBaseUrl}/login`, {
    credentials: 'include',
    method: 'POST',
    body: JSON.stringify(data),
  }).then(data => data.json()),

  signup: (data) => fetch(`${APIBaseUrl}/signup`, {
    credentials: 'include',
    method: 'POST',
    body: JSON.stringify(data),
  }).then(data => data.json()),

  validate: (data) => fetch(`${APIBaseUrl}/validate`, {
    method: 'POST',
    body: JSON.stringify(data),
  }).then(data => data.json()),

  logout: (data) => fetch(`${APIBaseUrl}/logout`, {
    method: 'POST',
    body: JSON.stringify(data),
  }),

  addLesson: (data) => fetch(`${APIBaseUrl}/addLesson`, {
    method: 'POST',
    body: JSON.stringify(data),
  }).then(data => data.json()),

  deleteLesson: ({ pupil, lessonId }) => fetch(`${APIBaseUrl}/deleteLesson/${pupil}/${lessonId}`, {
    method: 'DELETE',
  }),

  getLessons: (user) => fetch(`${APIBaseUrl}/getLessons/${user}`, {
    method: 'GET',
  }).then(data => data.json()),
}

export default api;
