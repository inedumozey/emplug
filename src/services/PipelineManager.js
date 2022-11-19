import axios from 'axios'
import swal from 'sweetalert'

// const API_URL = 'https://employment-centers.herokuapp.com/api/v1';
let API_URL
if (process.env.NODE_ENV === 'development') {
  API_URL = process.env.REACT_APP_EMPLOYER_CENTER_LOCAL_API
} else {
  API_URL = process.env.REACT_APP_EMPLOYER_CENTER_API
}

export function getJobPipeline (id, token) {
  return axios.get(`${API_URL}/pipeline/single/${id}`, {
    headers: {
      authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })
}

export function postJobPipeline (data, token) {
  return axios.post(`${API_URL}/pipeline/new`, data, {
    headers: {
      authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })
}

export function updateJobPipeline (data, id, token) {
  console.log(data)
  return axios.put(`${API_URL}/pipeline/update/${id}`, data, {
    headers: {
      authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })
}

export function getSingleForm (id, token) {
  return axios.get(`${API_URL}/form/single/id/${id}`, {
    headers: {
      authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })
}

export function updateSingleForm (data, id, token) {
  return axios.put(`${API_URL}/form/update/${id}`, data, {
    headers: {
      authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })
}

export const singlePipelineGet = (id, token) => {
  return axios.get(`${API_URL}/pipeline/fetch-one/${id}`, {
    headers: {
      authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })
}

export const createOfficialLetter = async (data, token) => {
  try {
    const response = await axios.post(
      `${API_URL}/official-letter/create`,
      data,
      {
        headers: {
          authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    )
    console.log(response)
    if (response.status === 201) {
      swal(response.data.message)
    }
  } catch (err) {
    console.log(err)
  }
}
