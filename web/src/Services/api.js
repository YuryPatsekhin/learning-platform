const APIBaseUrl = "http://127.0.0.1:3000"

const api = {
  login: (data) => fetch(`${APIBaseUrl}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
}

export default api;