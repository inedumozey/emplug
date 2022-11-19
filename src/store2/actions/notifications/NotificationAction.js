import {
  startNotifications,
  getNotifications,
} from '../../../services/NotificationService'
import ConstantTypes from './notification-constants'

export const initNotifications = (token, id) => async (dispatch) => {
  dispatch({ type: ConstantTypes.INIT_NOTIFICATIONS })
  try {
    const response = await startNotifications(token, id)
    if (response.status === 200) {
      // setCode(response.status);

      const { _id } = response.data.data
      // dispatch(fetchNotifications(token, _id))
      console.log('init notific --->', response.data.data)
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

export const updateNotifications = (notifications) => ({
  type: ConstantTypes.UPDATE_NOTIFICATIONS,
  payload: notifications,
})
