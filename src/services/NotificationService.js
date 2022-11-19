import axios from 'axios'

const URL = `${process.env.REACT_APP_EMPLOYER_CENTER_API}/notification`

export const deleteNotificationService = (token, id) => {
  return axios.delete(`${URL}/delete/${id}`, {
     mode: 'no-cors',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  })
}

export const getNotifications = (token, id) => {
  return axios.get(`${URL}/fetch-single/${id}`, {
    mode: 'no-cors',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  })
}



export const readNotification = (token, id) => {
  return axios.get(`${URL}/read/${id}`, {
    mode: 'no-cors',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  })
}