import axios from 'axios'
import swal from 'sweetalert'
import { loginConfirmedAction, logout } from '../store/actions/auth/AuthActions'

// const API_URL = 'https://employment-centers.herokuapp.com/api/v1'
let API_URL;
if (process.env.NODE_ENV === 'development') {
  API_URL = process.env.REACT_APP_EMPLOYER_CENTER_LOCAL_API;
} else {
  API_URL = process.env.REACT_APP_EMPLOYER_CENTER_API;
}

export function signUp(data) {
  //axios call
  const postData = { ...data }

  return axios.post(`${API_URL}/account/register`, postData)
}

export function verify(token) {
  return axios.post(`${API_URL}/account/verify-account`, token)
}

export function login(email, password) {
  const postData = {
    id: email,
    password,
    // returnSecureToken: true,
  }
  return axios.post(`${API_URL}/account/login`, postData, {
    headers: {
      "Content-type": "application/json"
    }
  })
}

export function resetPasswordToken(token) {
  return axios.post(`${API_URL}/account/verify-forget-password-token`, { resetPasswordToken: token })
}

export function updateUserPassword(id, newPassword) {
  return axios.post(`${API_URL}/account/change-password?userId=${id}`, { newPassword });
}

export function formatError(errorResponse) {
  switch (errorResponse.message) {
    case 'Sorry this account is inactive':
      swal('Oops', 'Sorry this account is inactive', 'info')
      break
    case 'Email already in use':
      swal('Oops', errorResponse.message, 'error')
      break

    case 'Duplicate field value entered':
      swal('Oops', errorResponse.message, 'error')
      break

    case 'Invalid password':
      //return 'Email already exists';
      swal('Oops', 'Invalid password', 'error')
      break
    case '"deviceToken" is required':
      //return 'Email already exists';
      swal('Oops', errorResponse.message, 'error')
      break
    case 'Invalid username/email':
      //return 'Email already exists';
      swal('Oops', errorResponse.message, 'error')
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

export function saveTokenInLocalStorage(tokenDetails) {
  tokenDetails.expireDate = new Date(
    new Date().getTime() + tokenDetails.expiresIn * 1000
  )
  localStorage.setItem('userDetails', JSON.stringify(tokenDetails))
}

export function runLogoutTimer(dispatch, timer, history) {
  setTimeout(() => {
    dispatch(logout(history))
  }, timer)
}

export function checkAutoLogin(dispatch, history) {
  const tokenDetailsString = localStorage.getItem('userDetails')
  let tokenDetails = ''
  if (!tokenDetailsString) {
    dispatch(logout(history))
    return
  }

  tokenDetails = JSON.parse(tokenDetailsString)
  let expireDate = new Date(tokenDetails.expireDate)
  let todaysDate = new Date()

  if (todaysDate > expireDate) {
    dispatch(logout(history))
    return
  }
  dispatch(loginConfirmedAction(tokenDetails))

  const timer = expireDate.getTime() - todaysDate.getTime()
  runLogoutTimer(dispatch, timer, history)
}
