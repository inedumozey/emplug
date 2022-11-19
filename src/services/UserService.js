import axios from 'axios'
import swal from 'sweetalert'

// const API_URL = 'https://employment-centers.herokuapp.com/api/v1'
let API_URL;
if (process.env.NODE_ENV === 'development') {
  API_URL = process.env.REACT_APP_EMPLOYER_CENTER_LOCAL_API;
} else {
  API_URL = process.env.REACT_APP_EMPLOYER_CENTER_API;
}
console.log(API_URL);

export function updateProfile(data, id, token) {
  //axios call
  const config = {
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }
  const postData = { ...data }

  return axios.put(`${API_URL}/user/update-user?userId=${id}`, postData, config)
}

export function formatError(errorResponse) {
  switch (errorResponse.message) {
    case 'Sorry this account is inactive':
      swal('Oops', 'Sorry this account is inactive', 'info')
      break

    case 'Invalid password':
      //return 'Email already exists';
      swal('Oops', 'Invalid password', 'error')
      break
    case 'EMAIL_NOT_FOUND':
      //return 'Email not found';
      swal('Oops', 'Email not found', 'error', { button: 'Try Again!' })
      break
    case 'INVALID_PASSWORD':
      //return 'Invalid Password';
      swal('Oops', 'Invalid Password', 'error', { button: 'Try Again!' })
      break
    case 'USER_DISABLED':
      return 'User Disabled'
    case 'WEAK_PASSWORD : Password should be at least 6 characters':
      //return 'Weak Password';
      swal('Oops', errorResponse.message.split(':')[1], 'error', {
        button: 'Try Again!',
      })
      break

    default:
      return ''
  }
}
