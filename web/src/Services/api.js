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

  moveLesson: (data) => fetch(`${APIBaseUrl}/moveLesson`, {
    method: 'POST',
    body: JSON.stringify(data),
  }),

  getLessons: (user) => fetch(`${APIBaseUrl}/getLessons/${user}`, {
    method: 'GET',
  }).then(data => data.json()),

  addTopic: (data) => fetch(`${APIBaseUrl}/addTopic`, {
    method: 'POST',
    body: JSON.stringify(data),
  }).then(data => data.json()),

  getTopics: (pupil) => fetch(`${APIBaseUrl}/getTopics/${pupil}`, {
    method: 'GET',
  }).then(data => data.json()),

  getWords: ({ pupil, topic }) => fetch(`${APIBaseUrl}/getWords/${pupil}/${topic}`, {
    method: 'GET',
  }).then(data => data.json()),

  addWord: (data) => fetch(`${APIBaseUrl}/addWord`, {
    method: 'POST',
    body: JSON.stringify(data),
  }).then(data => data.json()),

  deleteWord: (data) => fetch(`${APIBaseUrl}/deleteWord`, {
    method: 'POST',
    body: JSON.stringify(data),
  }).then(data => data.json()),
}

export default api;
