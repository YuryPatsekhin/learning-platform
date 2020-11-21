const APIBaseUrl = "http://localhost:3000"

const api = {
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
}

export default api;
