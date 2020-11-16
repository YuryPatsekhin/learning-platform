const APIBaseUrl = "http://localhost:3000"

const api = {
  login: (data) => fetch(`${APIBaseUrl}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }),
  signup: (data) => fetch(`${APIBaseUrl}/signup`, {
    method: 'POST',
    body: JSON.stringify(data),
  }).then(data => data.json()),
  login: (data) => fetch(`${APIBaseUrl}/login`, {
    method: 'POST',
    body: JSON.stringify(data),
  }).then(data => data.json()),
  validate: (data) => fetch(`${APIBaseUrl}/validate`, {
    method: 'POST',
    body: JSON.stringify(data),
  }).then(data => data.json()),
}

export default api;
