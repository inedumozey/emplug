import ConstantTypes from '../actions/notifications/notification-constants'

const INITIAL_STATE = {
  notifications_id: '',
  allNotifications: [],
  isLoading: false,
  loaded: false
}

const { INIT_NOTIFICATIONS, GET_NOTIFICATIONS, UPDATE_NOTIFICATIONS } = ConstantTypes

const notificationsReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action

  switch (type) {
    case INIT_NOTIFICATIONS:
      return { ...state, isLoading: true }
    case GET_NOTIFICATIONS:
      return {
        ...state,
        isLoading: true,
      }
    case UPDATE_NOTIFICATIONS:
      return {
        ...state,
        isLoading: false,
        loaded: true,
        allNotifications: payload,
      }

    default:
      return { ...state }
  }
}

export default notificationsReducer
