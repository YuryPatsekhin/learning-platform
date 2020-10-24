const APIBaseUrl = "http://localhost:3000"

const api = {
  login: (data) => fetch(`${APIBaseUrl}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }),
  signup: () => fetch(`${APIBaseUrl}/signup`, {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export default api;
