import axios from 'axios'

// const API_URL = 'https://employment-centers.herokuapp.com/api/v1'
let API_URL;
if (process.env.NODE_ENV === 'development') {
  API_URL = process.env.REACT_APP_EMPLOYER_CENTER_LOCAL_API;
} else {
  API_URL = process.env.REACT_APP_EMPLOYER_CENTER_API;
}
console.log(API_URL);

export function getOrganisationList(token) {
  return axios.get(`${API_URL}/organization/fetch-all`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  })
}

export function fetchSingleOrganisation(id, token) {
  return axios.get(`${API_URL}/organization/fetch-user-organization?userId=${id}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  })
}

export function fetchOrganisation(id, token) {
  return axios.get(`${API_URL}/organization/fetch-single?organizationId=${id}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  })
}

export async function addNewOrganisation(data, token) {
  return await axios.post(`${API_URL}/organization/create-organization`, data, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  })
}

export function updateOrganisation(data, id, token) {
  return axios.put(
    `${API_URL}/organization/update?organizationId=${id}`,
    data,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  )
}

export function removeOrganisation(id, token) {
  return axios.delete(`${API_URL}/organization/create-organization?id=${id}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  })
}

export function getAllUsers(token) {
  return axios.get(`${API_URL}/admin/fetch_all_user`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  })
}
