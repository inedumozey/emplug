import {
  deleteNotificationService,
  getNotifications,
  readNotification
} from '../../../services/NotificationService'
import ConstantTypes from './notification-constants'

export const deleteNotification = (token, id) => async (dispatch) => {
  dispatch({ type: ConstantTypes.DELETE_NOTIFICATION })
  try {
    const response = await deleteNotificationService(token, id)
    if (response.status === 200) {
      // setCode(response.status);

      // const { _id } = response.data.data
      // dispatch(fetchNotifications(token, _id))
      console.log('delete notific --->', response.data.data)
    }
  } catch (error) {
    console.log(error.response)
    // dispatch({
    // 	type: ConstantTypes.CREATE_JOB_POSTING_FAILED,
    // 	payload: error.response.data
    // })
  }
}

export const fetchNotifications = (token, id) => async (dispatch) => {
  dispatch({ type: ConstantTypes.GET_NOTIFICATIONS })
  try {
    const response = await getNotifications(token, id)
    if (response.status === 200) {
      // setCode(response.status);
      dispatch(updateNotifications(response.data.data))
      // console.log("fetch notific ---> ", response.data)
    }
  } catch (error) {
    console.log(error.response)
    // dispatch({
    // 	type: ConstantTypes.GET_NOTIFICATIONS_FAILED,
    // 	payload: error.response.data
    // })
  }
}

export const markNotifications = (token, id) => async (dispatch) => {
  dispatch({ type: ConstantTypes.GET_NOTIFICATIONS })
  try {
    const response = await readNotification(token, id)
    if (response.status === 200) {
      // setCode(response.status);
      dispatch(updateNotifications(response.data.data))
      // console.log("fetch notific ---> ", response.data)
    }
  } catch (error) {
    console.log(error.response)
    // dispatch({
    // 	type: ConstantTypes.GET_NOTIFICATIONS_FAILED,
    // 	payload: error.response.data
    // })
  }
}

export const updateNotifications = (notifications) => ({
  type: ConstantTypes.UPDATE_NOTIFICATIONS,
  payload: notifications,
})
