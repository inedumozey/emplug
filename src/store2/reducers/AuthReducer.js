import AuthConstantTypes from '../actions/auth/AuthConstantTypes'

const initialState = {
  auth: {},
  errorMessage: '',
  successMessage: '',
  showLoading: false,
  user_view: null
}

export function AuthReducer(state = initialState, action={}) {
  if (action.type === AuthConstantTypes.SIGNUP_CONFIRMED_ACTION) {
    return {
      ...state,
      auth: action.payload,
      errorMessage: '',
      successMessage: 'Signup Successfully Completed',
      showLoading: false,
    }
  }
  if (action.type === AuthConstantTypes.LOGIN_CONFIRMED_ACTION) {
    console.log(action)
    return {
      ...state,
      auth: action.payload,
      errorMessage: '',
      successMessage: 'Login Successfully Completed',
      showLoading: false,
    }
  }
  if (action.type === AuthConstantTypes.LOAD_USER) {
    return {
      ...state,
      auth: {
        ...state.auth,
        user: action.payload,
      },
      errorMessage: '',
      successMessage: 'Login Successfully Completed',
      showLoading: false,
    }
  }

  if (action.type === AuthConstantTypes.LOGOUT_ACTION) {
    return {
      ...state,
      auth: {},
      errorMessage: '',
      successMessage: '',
      showLoading: false,
    }
  }

  if (
    action.type === AuthConstantTypes.SIGNUP_FAILED_ACTION ||
    action.type === AuthConstantTypes.LOGIN_FAILED_ACTION
  ) {
    return {
      ...state,
      errorMessage: action.payload,
      successMessage: '',
      showLoading: false,
    }
  }

  if (action.type === AuthConstantTypes.LOADING_TOGGLE_ACTION) {
    return {
      ...state,
      showLoading: action.payload,
    }
  }
  if (action.type === AuthConstantTypes.UPDATE_PERSONAL_PROFILE) {
    return {
      ...state,
      auth: action.payload,
    }
  }

  if (action.type === AuthConstantTypes.VIEW_USER_PROFILE) {
    return {
      ...state,
      user_view: action.payload,
    }
  }
  return state
}


